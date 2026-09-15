/**
 * Calisto Vault - Cloudflare Worker API
 * 
 * DARMOWY backend dla aplikacji Android
 * Wykorzystuje Cloudflare Workers (100K żądań/dzień w darmowym planie)
 * i KV Storage (1GB pamięci, 100K operacji/dzień w darmowym planie)
 * 
 * Konfiguracja:
 * 1. Utwórz KV namespace w Cloudflare Dashboard
 * 2. Zmień nazwę bindingu w wrangler.toml
 * 3. Wdróż: wrangler deploy
 */

// API Response helper
function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}

// Handle OPTIONS for CORS preflight
function handleOptions() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}

// Main request handler
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;
        const method = request.method;
        
        // CORS preflight
        if (method === 'OPTIONS') {
            return handleOptions();
        }
        
        try {
            // API Endpoints
            if (path === '/api/data' && method === 'GET') {
                return await handleGetData(env);
            }
            
            if (path === '/api/data' && method === 'POST') {
                return await handlePostData(request, env);
            }
            
            if (path === '/api/auth' && method === 'POST') {
                return await handleAuth(request, env);
            }
            
            if (path === '/api/ping' && method === 'GET') {
                return jsonResponse({ success: true, message: 'pong', timestamp: Date.now() });
            }
            
            // Serve static files for Pages (if needed)
            if (path === '/') {
                return Response.redirect('https://YOUR_PAGES_URL.pages.dev/', 302);
            }
            
            // 404 for unknown routes
            return jsonResponse({ success: false, error: 'Not found' }, 404);
            
        } catch (error) {
            console.error('Error:', error);
            return jsonResponse({ 
                success: false, 
                error: 'Internal server error',
                message: error.message 
            }, 500);
        }
    }
};

/**
 * GET /api/data
 * Pobiera wszystkie dane z KV Storage
 */
async function handleGetData(env) {
    try {
        const data = await env.DATA.list();
        const items = await Promise.all(
            data.keys.map(async (key) => {
                const value = await env.DATA.get(key.name);
                return { key: key.name, value: value || '' };
            })
        );
        
        return jsonResponse({
            success: true,
            data: items,
            count: items.length
        });
    } catch (error) {
        return jsonResponse({
            success: false,
            error: 'Failed to fetch data',
            message: error.message
        }, 500);
    }
}

/**
 * POST /api/data
 * Zapisuje dane do KV Storage
 * Body: { data: [{ key: string, value: string }] }
 */
async function handlePostData(request, env) {
    try {
        const body = await request.json();
        const items = body.data || [];
        
        if (!Array.isArray(items)) {
            return jsonResponse({
                success: false,
                error: 'Invalid data format. Expected array of {key, value} objects.'
            }, 400);
        }
        
        // Validate items
        const validItems = items.filter(item => 
            item && typeof item.key === 'string' && item.key.length <= 512
        );
        
        if (validItems.length === 0) {
            return jsonResponse({
                success: false,
                error: 'No valid items to save'
            }, 400);
        }
        
        // Save all items (KV Storage has 5ms read, 50ms write latency in free tier)
        const results = await Promise.allSettled(
            validItems.map(async (item) => {
                const value = String(item.value || '');
                await env.DATA.put(item.key, value, { expirationTtl: 86400 * 30 }); // 30 days TTL
                return { key: item.key, success: true };
            })
        );
        
        const successful = results.filter(r => r.status === 'fulfilled').length;
        
        return jsonResponse({
            success: successful === validItems.length,
            saved: successful,
            failed: validItems.length - successful,
            message: `Saved ${successful} of ${validItems.length} items`
        });
        
    } catch (error) {
        return jsonResponse({
            success: false,
            error: 'Failed to save data',
            message: error.message
        }, 500);
    }
}

/**
 * POST /api/auth
 * Prosta autentykacja (token-based, dla demo)
 * W produkcji użyj JWT lub lepszego mechanizmu
 * Body: { token: string }
 */
async function handleAuth(request, env) {
    try {
        const body = await request.json();
        const token = body.token;
        
        if (!token || typeof token !== 'string') {
            return jsonResponse({
                success: false,
                error: 'Token is required'
            }, 400);
        }
        
        // W darmowym planie możemy przechowywać tokeny w KV
        // Dla demo: akceptujemy dowolny niepusty token
        const validToken = await env.DATA.get(`auth_token_${token}`);
        
        if (validToken) {
            return jsonResponse({
                success: true,
                authenticated: true,
                token: token
            });
        }
        
        // Auto-register for demo purposes
        await env.DATA.put(`auth_token_${token}`, 'valid', { expirationTtl: 86400 * 7 }); // 7 days
        
        return jsonResponse({
            success: true,
            authenticated: true,
            token: token,
            registered: true
        });
        
    } catch (error) {
        return jsonResponse({
            success: false,
            error: 'Authentication failed',
            message: error.message
        }, 500);
    }
}
