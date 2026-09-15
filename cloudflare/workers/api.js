/**
 * Calisto Vault - Cloudflare Worker API
 * 
 * DARMOWY backend dla aplikacji Android
 * 
 * Funkcje:
 * - KV Storage: metadane, ustawienia (1GB darmowo)
 * - R2 Storage: pliki (zdjęcia, filmy, PDF) - 10GB darmowo
 * - AI: Mistral, Hugging Face, Replicate (darmowe API)
 * 
 * Konfiguracja:
 * 1. Utwórz KV namespace: DATA
 * 2. Utwórz R2 bucket: CALISTO_DATA
 * 3. Dodaj bindingi w wrangler.toml
 * 4. Dodaj API klucze do KV (MISTRAL_API_KEY, HUGGINGFACE_API_KEY, REPLICATE_API_KEY)
 * 5. Wdróż: wrangler deploy
 */

import { 
    uploadToR2, 
    downloadFromR2, 
    deleteFromR2, 
    listFromR2,
    checkFileExists 
} from './r2-utils.js';

import {
    generateTextWithMistral,
    analyzeTextWithHuggingFace,
    generateImageWithReplicate,
    translateText,
    summarizeText,
    analyzeSentiment
} from './ai-utils.js';

// API Response helper
function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    });
}

// Handle OPTIONS for CORS preflight
function handleOptions() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
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
            // ========== DATA API (KV Storage) ==========
            
            if (path === '/api/data' && method === 'GET') {
                return await handleGetData(env);
            }
            
            if (path === '/api/data' && method === 'POST') {
                return await handlePostData(request, env);
            }
            
            if (path === '/api/data' && method === 'DELETE') {
                return await handleDeleteData(request, env);
            }
            
            // ========== FILES API (R2 Storage) ==========
            
            if (path === '/api/files/upload' && method === 'POST') {
                return await uploadToR2(request, env, 'CALISTO_DATA');
            }
            
            if (path === '/api/files/download' && method === 'GET') {
                const objectName = url.searchParams.get('fileName');
                if (!objectName) {
                    return jsonResponse({ success: false, error: 'fileName parameter is required' }, 400);
                }
                return await downloadFromR2(objectName, env, 'CALISTO_DATA');
            }
            
            if (path === '/api/files/delete' && method === 'DELETE') {
                const { fileName } = await request.json();
                if (!fileName) {
                    return jsonResponse({ success: false, error: 'fileName is required' }, 400);
                }
                return await deleteFromR2(fileName, env, 'CALISTO_DATA');
            }
            
            if (path === '/api/files/list' && method === 'GET') {
                const prefix = url.searchParams.get('prefix') || '';
                const limit = parseInt(url.searchParams.get('limit')) || 50;
                return await listFromR2(env, prefix, limit, 'CALISTO_DATA');
            }
            
            if (path === '/api/files/exists' && method === 'GET') {
                const fileName = url.searchParams.get('fileName');
                if (!fileName) {
                    return jsonResponse({ success: false, error: 'fileName parameter is required' }, 400);
                }
                return await checkFileExists(fileName, env, 'CALISTO_DATA');
            }
            
            // ========== AI API ==========
            
            if (path === '/api/ai/generate' && method === 'POST') {
                const { prompt, options } = await request.json();
                if (!prompt) {
                    return jsonResponse({ success: false, error: 'prompt is required' }, 400);
                }
                return await generateTextWithMistral(prompt, env, options);
            }
            
            if (path === '/api/ai/analyze' && method === 'POST') {
                const { text, task } = await request.json();
                if (!text) {
                    return jsonResponse({ success: false, error: 'text is required' }, 400);
                }
                return await analyzeTextWithHuggingFace(text, task || 'sentiment-analysis', env);
            }
            
            if (path === '/api/ai/image' && method === 'POST') {
                const { prompt } = await request.json();
                if (!prompt) {
                    return jsonResponse({ success: false, error: 'prompt is required' }, 400);
                }
                return await generateImageWithReplicate(prompt, env);
            }
            
            if (path === '/api/ai/translate' && method === 'POST') {
                const { text, targetLang } = await request.json();
                if (!text) {
                    return jsonResponse({ success: false, error: 'text is required' }, 400);
                }
                return await translateText(text, targetLang || 'pl', env);
            }
            
            if (path === '/api/ai/summarize' && method === 'POST') {
                const { text, length } = await request.json();
                if (!text) {
                    return jsonResponse({ success: false, error: 'text is required' }, 400);
                }
                return await summarizeText(text, length || 'medium', env);
            }
            
            if (path === '/api/ai/sentiment' && method === 'POST') {
                const { text } = await request.json();
                if (!text) {
                    return jsonResponse({ success: false, error: 'text is required' }, 400);
                }
                return await analyzeSentiment(text, env);
            }
            
            // ========== AUTH API ==========
            
            if (path === '/api/auth' && method === 'POST') {
                return await handleAuth(request, env);
            }
            
            if (path === '/api/auth/validate' && method === 'GET') {
                const token = url.searchParams.get('token');
                return await validateToken(token, env);
            }
            
            // ========== SYSTEM API ==========
            
            if (path === '/api/ping' && method === 'GET') {
                return jsonResponse({ 
                    success: true, 
                    message: 'pong', 
                    timestamp: Date.now(),
                    version: '1.0.0'
                });
            }
            
            if (path === '/api/stats' && method === 'GET') {
                return await handleStats(env);
            }
            
            // ========== UNKNOWN ==========
            
            return jsonResponse({ 
                success: false, 
                error: 'Not found',
                availableEndpoints: [
                    'GET /api/ping',
                    'GET /api/data',
                    'POST /api/data',
                    'POST /api/files/upload',
                    'GET /api/files/download?fileName=...',
                    'DELETE /api/files/delete',
                    'GET /api/files/list',
                    'GET /api/files/exists?fileName=...',
                    'POST /api/ai/generate',
                    'POST /api/ai/analyze',
                    'POST /api/ai/image',
                    'POST /api/ai/translate',
                    'POST /api/ai/summarize',
                    'POST /api/ai/sentiment',
                    'POST /api/auth',
                    'GET /api/auth/validate?token=...'
                ]
            }, 404);
            
        } catch (error) {
            console.error('Error:', error);
            return jsonResponse({ 
                success: false, 
                error: 'Internal server error', 
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            }, 500);
        }
    }
};

// ========== DATA API IMPLEMENTATIONS ==========

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
                try {
                    return { key: key.name, value: JSON.parse(value || 'null') };
                } catch (e) {
                    return { key: key.name, value: value || '' };
                }
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
        
        const validItems = items.filter(item => 
            item && typeof item.key === 'string' && item.key.length <= 512
        );
        
        if (validItems.length === 0) {
            return jsonResponse({
                success: false,
                error: 'No valid items to save'
            }, 400);
        }
        
        const results = await Promise.allSettled(
            validItems.map(async (item) => {
                const value = JSON.stringify(item.value || {});
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
 * DELETE /api/data
 * Usuwa dane z KV Storage
 */
async function handleDeleteData(request, env) {
    try {
        const { keys } = await request.json();
        
        if (!Array.isArray(keys)) {
            return jsonResponse({
                success: false,
                error: 'Expected array of keys to delete'
            }, 400);
        }
        
        const results = await Promise.allSettled(
            keys.map(async (key) => {
                await env.DATA.delete(key);
                return { key: key, success: true };
            })
        );
        
        const successful = results.filter(r => r.status === 'fulfilled').length;
        
        return jsonResponse({
            success: successful === keys.length,
            deleted: successful,
            failed: keys.length - successful
        });
        
    } catch (error) {
        return jsonResponse({
            success: false,
            error: 'Failed to delete data',
            message: error.message
        }, 500);
    }
}

// ========== AUTH API IMPLEMENTATIONS ==========

/**
 * POST /api/auth
 * Autentykacja użytkownika (token-based)
 */
async function handleAuth(request, env) {
    try {
        const body = await request.json();
        const token = body.token;
        const userId = body.userId;
        
        if (!token || typeof token !== 'string') {
            return jsonResponse({
                success: false,
                error: 'Token is required'
            }, 400);
        }
        
        // Sprawdź czy token istnieje
        const validToken = await env.DATA.get(`auth_token_${token}`);
        
        if (validToken) {
            // Odśwież TTL
            await env.DATA.put(`auth_token_${token}`, validToken, { expirationTtl: 86400 * 7 });
            
            return jsonResponse({
                success: true,
                authenticated: true,
                token: token,
                userId: userId || token
            });
        }
        
        // Auto-register dla demo
        if (userId) {
            await env.DATA.put(`auth_token_${token}`, JSON.stringify({
                userId: userId,
                created: Date.now()
            }), { expirationTtl: 86400 * 7 });
            
            return jsonResponse({
                success: true,
                authenticated: true,
                token: token,
                userId: userId,
                registered: true
            });
        }
        
        return jsonResponse({
            success: false,
            error: 'Invalid token and no userId provided for registration'
        }, 401);
        
    } catch (error) {
        return jsonResponse({
            success: false,
            error: 'Authentication failed',
            message: error.message
        }, 500);
    }
}

/**
 * GET /api/auth/validate
 * Walidacja tokenu
 */
async function validateToken(token, env) {
    try {
        if (!token) {
            return jsonResponse({
                success: false,
                error: 'Token is required'
            }, 400);
        }
        
        const validToken = await env.DATA.get(`auth_token_${token}`);
        
        if (validToken) {
            try {
                const tokenData = JSON.parse(validToken);
                return jsonResponse({
                    success: true,
                    valid: true,
                    userId: tokenData.userId || token
                });
            } catch (e) {
                return jsonResponse({
                    success: true,
                    valid: true,
                    userId: token
                });
            }
        }
        
        return jsonResponse({
            success: true,
            valid: false
        });
        
    } catch (error) {
        return jsonResponse({
            success: false,
            error: 'Validation failed',
            message: error.message
        }, 500);
    }
}

// ========== STATS API ==========

/**
 * GET /api/stats
 * Statystyki systemu
 */
async function handleStats(env) {
    try {
        // KV Stats
        const kvKeys = await env.DATA.list();
        const kvCount = kvKeys.keys.length;
        
        // R2 Stats (jeśli dostępne)
        let r2Stats = {};
        try {
            const r2Objects = await env.CALISTO_DATA.list({ limit: 1 });
            r2Stats = {
                available: true,
                objectCount: r2Objects.objects.length
            };
        } catch (e) {
            r2Stats = { available: false };
        }
        
        return jsonResponse({
            success: true,
            kvStorage: {
                keys: kvCount,
                maxKeys: 100000 // Free tier limit
            },
            r2Storage: r2Stats,
            workers: {
                requestsToday: 0, // Trudno do pobrania
                maxRequests: 100000 // Free tier limit
            },
            timestamp: Date.now()
        });
        
    } catch (error) {
        return jsonResponse({
            success: false,
            error: 'Failed to get stats',
            message: error.message
        }, 500);
    }
}
