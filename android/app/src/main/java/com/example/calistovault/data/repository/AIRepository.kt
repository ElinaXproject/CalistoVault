package com.example.calistovault.data.repository

import com.example.calistovault.network.AITextResponse
import com.example.calistovault.network.AIImageResponse
import com.example.calistovault.network.AISentimentResponse
import com.example.calistovault.network.ApiResponse
import com.example.calistovault.network.ApiService

/**
 * Repozytorium do funkcji AI
 * 
 * Integracje z:
 * - Mistral AI (generowanie tekstu, tłumaczenia, podsumowania)
 * - Hugging Face (analiza sentymentu, klasyfikacja tekstu)
 * - Replicate (generowanie obrazów - Stable Diffusion)
 * 
 * Wszystkie API są DARMOWE w ramach limitów free tier
 */
class AIRepository(
    private val apiService: ApiService
) {
    
    // ========== TEXT GENERATION ==========
    
    /**
     * Generuj tekst z Mistral AI
     * @param prompt - Tekst wejściowy
     * @param model - Model (mistral-tiny, mistral-small, mistral-medium)
     * @param temperature - Kreatywność (0-1)
     * @param maxTokens - Maksymalna liczba tokenów
     */
    suspend fun generateText(
        prompt: String,
        model: String = "mistral-tiny",
        temperature: Double = 0.7,
        maxTokens: Int = 500
    ): ApiResponse<AITextResponse> {
        return apiService.generateText(
            mapOf(
                "prompt" to prompt,
                "options" to mapOf(
                    "model" to model,
                    "temperature" to temperature,
                    "maxTokens" to maxTokens
                )
            )
        )
    }
    
    /**
     * Kontynuuj tekst (chat)
     */
    suspend fun continueChat(
        messages: List<Map<String, String>>,
        model: String = "mistral-tiny",
        temperature: Double = 0.7
    ): ApiResponse<AITextResponse> {
        return apiService.generateText(
            mapOf(
                "prompt" to messages.joinToString("\n") { it["content"] },
                "options" to mapOf(
                    "model" to model,
                    "temperature" to temperature
                )
            )
        )
    }
    
    // ========== TRANSLATION ==========
    
    /**
     * Przetłumacz tekst
     * @param text - Tekst do przetłumaczenia
     * @param targetLang - Docelowy język (pl, en, fr, de, es, etc.)
     */
    suspend fun translateText(
        text: String,
        targetLang: String = "pl"
    ): ApiResponse<AITextResponse> {
        return apiService.translateText(
            mapOf(
                "text" to text,
                "targetLang" to targetLang
            )
        )
    }
    
    // ========== SUMMARIZATION ==========
    
    /**
     * Podsumuj tekst
     * @param text - Tekst do podsumowania
     * @param length - Długość (short, medium, long)
     */
    suspend fun summarizeText(
        text: String,
        length: String = "medium"
    ): ApiResponse<AITextResponse> {
        return apiService.summarizeText(
            mapOf(
                "text" to text,
                "length" to length
            )
        )
    }
    
    // ========== SENTIMENT ANALYSIS ==========
    
    /**
     * Analiza sentymentu tekstu
     * @param text - Tekst do analizy
     * @return Pozytywny/Negatywny/Neutralny + score
     */
    suspend fun analyzeSentiment(
        text: String
    ): ApiResponse<AISentimentResponse> {
        return apiService.analyzeSentiment(
            mapOf("text" to text)
        )
    }
    
    // ========== TEXT ANALYSIS ==========
    
    /**
     * Analiza tekstu (kategoryzacja, tagowanie, etc.)
     * @param text - Tekst do analizy
     * @param task - Typ analizy (sentiment-analysis, text-classification, etc.)
     */
    suspend fun analyzeText(
        text: String,
        task: String = "sentiment-analysis"
    ): ApiResponse<Map<String, Any>> {
        return apiService.analyzeText(
            mapOf(
                "text" to text,
                "task" to task
            )
        )
    }
    
    // ========== IMAGE GENERATION ==========
    
    /**
     * Generuj obraz z tekstu (Stable Diffusion)
     * @param prompt - Opis obrazu w języku angielskim
     * @param negativePrompt - Co ma zostać wykluczone
     * @param width - Szerokość (512, 768, 1024)
     * @param height - Wysokość (512, 768, 1024)
     */
    suspend fun generateImage(
        prompt: String,
        negativePrompt: String = "blurry, low quality, distorted",
        width: Int = 512,
        height: Int = 512
    ): ApiResponse<AIImageResponse> {
        return apiService.generateImage(
            mapOf(
                "prompt" to prompt,
                "negative_prompt" to negativePrompt,
                "width" to width.toString(),
                "height" to height.toString()
            )
        )
    }
    
    // ========== CREATIVE FUNCTIONS ==========
    
    /**
     * Generuj pomysły (np. na hasła, nazwy, treści)
     */
    suspend fun generateIdeas(
        topic: String,
        count: Int = 5
    ): ApiResponse<AITextResponse> {
        val prompt = "Wygeneruj $count pomysłów na temat: $topic. Każdy pomysł w nowej linii."
        return generateText(prompt, temperature = 0.8)
    }
    
    /**
     * Popraw gramatykę i styl tekstu
     */
    suspend fun improveText(
        text: String,
        style: String = "professional"
    ): ApiResponse<AITextResponse> {
        val prompt = "Popraw poniższy tekst pod względem gramatyki, stylu i czytelności. Zachowaj oryginalne znaczenie. Styl: $style\n\n$text"
        return generateText(prompt, temperature = 0.3)
    }
    
    /**
     * Wyjaśnij pojęcie
     */
    suspend fun explainConcept(
        concept: String,
        forWhom: String = "laik"
    ): ApiResponse<AITextResponse> {
        val prompt = "Wyjaśnij pojęcie '$concept' w prosty sposób, jakbyś tłumaczył to dla $forWhom."
        return generateText(prompt, temperature = 0.5)
    }
    
    /**
     * Generuj hasło
     */
    suspend fun generatePassword(
        requirements: String = "silne hasło z dużymi literami, cyframi i znakami specjalnymi"
    ): ApiResponse<AITextResponse> {
        val prompt = "Wygeneruj $requirements. Tylko hasło, nic więcej."
        return generateText(prompt, temperature = 1.0)
    }
    
    // ========== CODE ASSISTANT ==========
    
    /**
     * Wyjaśnij kod
     */
    suspend fun explainCode(
        code: String,
        language: String = "kotlin"
    ): ApiResponse<AITextResponse> {
        val prompt = "Wyjaśnij poniższy kod w języku $language, linii po linii:\n\n```$language\n$code\n```"
        return generateText(prompt, temperature = 0.3)
    }
    
    /**
     * Popraw kod
     */
    suspend fun fixCode(
        code: String,
        language: String = "kotlin",
        error: String? = null
    ): ApiResponse<AITextResponse> {
        val prompt = "Popraw poniższy kod w języku $language.${error?.let { " Błąd: $it" } ?: ""}\n\n```$language\n$code\n```"
        return generateText(prompt, temperature = 0.3)
    }
}
