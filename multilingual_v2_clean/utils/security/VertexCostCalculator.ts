export class VertexCostCalculator {
    private static PRICES: Record<string, { input: number; output: number }> = {
        'gemini-3-flash-preview': { input: 0.50 / 1_000_000, output: 3.00 / 1_000_000 },
        'gemini-3.1-flash-image-preview': { input: 0.50 / 1_000_000, output: 60.00 / 1_000_000 },
        'gemini-3.1-flash-tts-preview': { input: 1.00 / 1_000_000, output: 20.00 / 1_000_000 }
    };

    /**
     * Calculates input, output, and total costs in USD.
     */
    public static calculate(modelName: string, inputTokens: number, outputTokens: number) {
        const pricing = this.PRICES[modelName] || this.PRICES['gemini-3-flash-preview'];
        
        const inputCost = inputTokens * pricing.input;
        const outputCost = outputTokens * pricing.output;
        
        return {
            inputCost,
            outputCost,
            totalCost: inputCost + outputCost
        };
    }
}
