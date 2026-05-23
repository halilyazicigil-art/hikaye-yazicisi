import { describe, it, expect } from 'vitest';
import { VertexCostCalculator } from '../VertexCostCalculator';

describe('VertexCostCalculator', () => {
    it('should calculate correct cost for gemini-3-flash-preview', () => {
        // $0.50 per 1M input, $3.00 per 1M output
        const result = VertexCostCalculator.calculate('gemini-3-flash-preview', 1000, 2000);
        
        expect(result.inputCost).toBeCloseTo(0.0005, 6);
        expect(result.outputCost).toBeCloseTo(0.006, 6);
        expect(result.totalCost).toBeCloseTo(0.0065, 6);
    });

    it('should calculate correct cost for gemini-3.1-flash-image-preview', () => {
        // $0.50 per 1M input, $60.00 per 1M output
        const result = VertexCostCalculator.calculate('gemini-3.1-flash-image-preview', 4000, 1000);
        
        expect(result.inputCost).toBeCloseTo(0.002, 6);
        expect(result.outputCost).toBeCloseTo(0.060, 6);
        expect(result.totalCost).toBeCloseTo(0.062, 6);
    });

    it('should calculate correct cost for gemini-3.1-flash-tts-preview', () => {
        // $1.00 per 1M input, $20.00 per 1M output
        const result = VertexCostCalculator.calculate('gemini-3.1-flash-tts-preview', 1000, 5000);
        
        expect(result.inputCost).toBeCloseTo(0.001, 6);
        expect(result.outputCost).toBeCloseTo(0.100, 6);
        expect(result.totalCost).toBeCloseTo(0.101, 6);
    });

    it('should fallback to gemini-3-flash-preview for unknown models', () => {
        const result = VertexCostCalculator.calculate('unknown-model', 1000, 2000);
        
        expect(result.inputCost).toBeCloseTo(0.0005, 6);
        expect(result.outputCost).toBeCloseTo(0.006, 6);
        expect(result.totalCost).toBeCloseTo(0.0065, 6);
    });
});
