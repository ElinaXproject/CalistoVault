/**
 * Calisto Vault - Cloudflare R2 Storage Utilities
 * 
 * DARMOWY R2 Storage: 10GB pamięci + 1M operacji/miesiąc
 * Idealny do: zdjęć, filmów, PDF, plików audio
 * 
 * Konfiguracja:
 * 1. Utwórz R2 Bucket w Cloudflare Dashboard
 * 2. Dodaj binding w wrangler.toml
 * 3. Używaj funkcji z tego pliku
 */

/**
 * Generuje unikalną nazwę pliku
 */
function generateFileName(originalName, userId = 'default') {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const extension = originalName.split('.').pop() || 'bin';
    return `${userId}/${timestamp}_${randomId}.${extension}`;
}

/**
 * Upload pliku do R2
 * @param {Request} request - Żądanie z plikiem
 * @param {Environment} env - Środowisko Workers (z R2 bindingiem)
 * @param {string} bucketName - Nazwa bucketa (opcjonalnie)
 * @returns {Promise<Response>}
 */
export async function uploadToR2(request, env, bucketName = 'CALISTO_DATA') {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const userId = formData.get('userId') || 'default';
        const fileName = formData.get('fileName') || file.name;
        
        if (!file) {
            return new Response(JSON.stringify({
                success: false,
                error: 'No file provided'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Generuj unikalną nazwę
        const objectName = generateFileName(fileName, userId);
        
        // Upload do R2
        await env[bucketName].put(objectName, await file.arrayBuffer(), {
            httpMetadata: {
                contentType: file.type || 'application/octet-stream',
                contentDisposition: `attachment; filename="${fileName}"`
            }
        });
        
        // Generuj publiczny URL (Cloudflare CDN)
        const publicUrl = `https://${env.R2_PUBLIC_DOMAIN}/${objectName}`;
        
        return new Response(JSON.stringify({
            success: true,
            fileName: objectName,
            originalName: fileName,
            url: publicUrl,
            size: file.size,
            type: file.type
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: 'Upload failed',
            message: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

/**
 * Pobierz plik z R2
 * @param {string} objectName - Nazwa obiektu w R2
 * @param {Environment} env - Środowisko Workers
 * @param {string} bucketName - Nazwa bucketa
 * @returns {Promise<Response>}
 */
export async function downloadFromR2(objectName, env, bucketName = 'CALISTO_DATA') {
    try {
        const object = await env[bucketName].get(objectName);
        
        if (!object) {
            return new Response(JSON.stringify({
                success: false,
                error: 'File not found'
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        return new Response(object.body, {
            status: 200,
            headers: {
                'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
                'Content-Disposition': object.httpMetadata?.contentDisposition || `inline; filename="${objectName}"`,
                'Content-Length': object.size.toString()
            }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: 'Download failed',
            message: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

/**
 * Usuń plik z R2
 * @param {string} objectName - Nazwa obiektu
 * @param {Environment} env - Środowisko Workers
 * @param {string} bucketName - Nazwa bucketa
 * @returns {Promise<Response>}
 */
export async function deleteFromR2(objectName, env, bucketName = 'CALISTO_DATA') {
    try {
        await env[bucketName].delete(objectName);
        
        return new Response(JSON.stringify({
            success: true,
            message: 'File deleted successfully',
            fileName: objectName
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: 'Delete failed',
            message: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

/**
 * Lista plików w R2 (paginacja)
 * @param {Environment} env - Środowisko Workers
 * @param {string} prefix - Prefiks (np. userId/)
 * @param {number} limit - Maksymalna liczba wyników
 * @param {string} bucketName - Nazwa bucketa
 * @returns {Promise<Response>}
 */
export async function listFromR2(env, prefix = '', limit = 50, bucketName = 'CALISTO_DATA') {
    try {
        const objects = await env[bucketName].list({
            prefix: prefix,
            limit: limit
        });
        
        const files = objects.objects.map(obj => ({
            name: obj.key,
            size: obj.size,
            uploaded: obj.uploaded,
            url: `https://${env.R2_PUBLIC_DOMAIN}/${obj.key}`
        }));
        
        return new Response(JSON.stringify({
            success: true,
            files: files,
            count: files.length,
            hasMore: objects.delimitedPrefixes.length > 0
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: 'List failed',
            message: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

/**
 * Sprawdź czy plik istnieje w R2
 * @param {string} objectName - Nazwa obiektu
 * @param {Environment} env - Środowisko Workers
 * @param {string} bucketName - Nazwa bucketa
 * @returns {Promise<Response>}
 */
export async function checkFileExists(objectName, env, bucketName = 'CALISTO_DATA') {
    try {
        const object = await env[bucketName].head(objectName);
        
        return new Response(JSON.stringify({
            success: true,
            exists: !!object,
            size: object?.size || 0
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({
            success: true,
            exists: false
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
