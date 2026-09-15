/**
 * Calisto Vault - AI Integration Utilities
 * 
 * DARMOWE API do AI:
 * - Mistral AI: 32,000 token/dzień
 * - Hugging Face: 10,000 req/miesiąc
 * - Replicate: $5 kredytów (Stable Diffusion)
 * 
 * Użycie:
 * 1. Dodaj API klucze do KV Storage
 * 2. Wywołuj funkcje z tego pliku
 */

/**
 * Generuje tekst z Mistral AI
 * @param {string} prompt - Tekst wejściowy
 * @param {Environment} env - Środowisko Workers
 * @returns {Promise<Response>}
 */
export async function generateTextWithMistral(prompt, env, options = {}) {
    try {
        // Pobierz API key z KV
        const apiKey = await env.DATA.get('MISTRAL_API_KEY');
        
        if (!apiKey) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Mistral API key not configured. Add MISTRAL_API_KEY to KV Storage.'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: options.model || 'mistral-tiny',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: options.temperature || 0.7,
                max_tokens: options.maxTokens || 500
            })
        });
        
        if (!response.ok) {
            const error = await response.text();
            return new Response(JSON.stringify({
                success: false,
                error: 'Mistral API error',
                message: error
            }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || '';
        
        return new Response(JSON.stringify({
            success: true,
            text: text,
            model: data.model,
            usage: data.usage
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: 'AI generation failed',
            message: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

/**
 * Analiza tekstu z Hugging Face (sentiment, classification, etc.)
 * @param {string} text - Tekst do analizy
 * @param {string} task - Zadanie (sentiment-analysis, text-classification, etc.)
 * @param {Environment} env - Środowisko Workers
 * @returns {Promise<Response>}
 */
export async function analyzeTextWithHuggingFace(text, task = 'sentiment-analysis', env) {
    try {
        // Pobierz API key z KV
        const apiKey = await env.DATA.get('HUGGINGFACE_API_KEY');
        
        if (!apiKey) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Hugging Face API key not configured. Add HUGGINGFACE_API_KEY to KV Storage.'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Mapowanie zadań do modeli
        const modelMap = {
            'sentiment-analysis': 'distilbert-base-uncased-finetuned-sst-2-english',
            'text-classification': 'facebook/bart-large-mnli',
            'text-generation': 'gpt2',
            'translation': 't5-small',
            'summarization': 'facebook/bart-large-cnn'
        };
        
        const model = modelMap[task] || task;
        
        const response = await fetch(
            `https://api-inference.huggingface.co/models/${model}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: text
                })
            }
        );
        
        if (!response.ok) {
            const error = await response.text();
            return new Response(JSON.stringify({
                success: false,
                error: 'Hugging Face API error',
                message: error
            }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        const data = await response.json();
        
        return new Response(JSON.stringify({
            success: true,
            result: data,
            model: model,
            task: task
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: 'AI analysis failed',
            message: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

/**
 * Generowanie obrazu z tekstu (Stable Diffusion via Replicate)
 * @param {string} prompt - Opis obrazu
 * @param {Environment} env - Środowisko Workers
 * @returns {Promise<Response>}
 */
export async function generateImageWithReplicate(prompt, env) {
    try {
        // Pobierz API key z KV
        const apiKey = await env.DATA.get('REPLICATE_API_KEY');
        
        if (!apiKey) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Replicate API key not configured. Add REPLICATE_API_KEY to KV Storage.'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        const response = await fetch('https://api.replicate.com/v1/predictions', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                version: 'ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4',
                input: {
                    prompt: prompt,
                    negative_prompt: 'blurry, low quality, distorted',
                    width: 512,
                    height: 512
                }
            })
        });
        
        if (!response.ok) {
            const error = await response.text();
            return new Response(JSON.stringify({
                success: false,
                error: 'Replicate API error',
                message: error
            }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        const data = await response.json();
        
        // Poczekaj na ukończenie generacji
        const prediction = await waitForPrediction(data.id, apiKey);
        
        if (!prediction.output) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Image generation failed',
                prediction: data
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        return new Response(JSON.stringify({
            success: true,
            imageUrl: prediction.output[0],
            predictionId: data.id
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: 'Image generation failed',
            message: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

/**
 * Czeka na ukończenie predykcji w Replicate
 */
async function waitForPrediction(predictionId, apiKey, timeout = 60000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
        const response = await fetch(
            `https://api.replicate.com/v1/predictions/${predictionId}`,
            {
                headers: {
                    'Authorization': `Token ${apiKey}`
                }
            }
        );
        
        if (!response.ok) {
            throw new Error('Failed to check prediction status');
        }
        
        const data = await response.json();
        
        if (data.status === 'succeeded') {
            return data;
        }
        
        if (data.status === 'failed') {
            throw new Error('Prediction failed');
        }
        
        // Czekaj 1 sekundę
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    throw new Error('Prediction timeout');
}

/**
 * Tłumaczenie tekstu z Mistral AI
 * @param {string} text - Tekst do przetłumaczenia
 * @param {string} targetLang - Docelowy język (pl, en, fr, etc.)
 * @param {Environment} env - Środowisko Workers
 * @returns {Promise<Response>}
 */
export async function translateText(text, targetLang = 'pl', env) {
    try {
        const prompt = `Przetłumacz poniższy tekst na język ${targetLang}. Odpowiadaj tylko przetłumaczonym tekstem, bez dodatkowych wyjaśnień:

${text}`;
        
        return await generateTextWithMistral(prompt, env, {
            model: 'mistral-tiny',
            temperature: 0.3,
            maxTokens: 1000
        });
        
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: 'Translation failed',
            message: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

/**
 * Podsumowanie tekstu z Mistral AI
 * @param {string} text - Tekst do podsumowania
 * @param {number} length - Długość podsumowania (short, medium, long)
 * @param {Environment} env - Środowisko Workers
 * @returns {Promise<Response>}
 */
export async function summarizeText(text, length = 'medium', env) {
    try {
        const lengthMap = {
            short: 'w 3 zdaniach',
            medium: 'w 5-7 zdaniach',
            long: 'w 10 zdaniach'
        };
        
        const prompt = `Podsumuj poniższy tekst ${lengthMap[length] || length}:

${text}`;
        
        return await generateTextWithMistral(prompt, env, {
            model: 'mistral-tiny',
            temperature: 0.5,
            maxTokens: 500
        });
        
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: 'Summarization failed',
            message: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

/**
 * Analiza sentymentu tekstu (pozytywny/negatywny/neutralny)
 * @param {string} text - Tekst do analizy
 * @param {Environment} env - Środowisko Workers
 * @returns {Promise<Response>}
 */
export async function analyzeSentiment(text, env) {
    try {
        const result = await analyzeTextWithHuggingFace(text, 'sentiment-analysis', env);
        
        if (!result.ok) {
            return result;
        }
        
        const data = await result.json();
        
        if (!data.success || !data.result) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Sentiment analysis failed'
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // Parse result from Hugging Face
        const sentimentResult = data.result[0];
        
        return new Response(JSON.stringify({
            success: true,
            sentiment: sentimentResult.label,
            score: sentimentResult.score,
            confidence: Math.max(...sentimentResult.scores.map(s => s.score))
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: 'Sentiment analysis failed',
            message: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
