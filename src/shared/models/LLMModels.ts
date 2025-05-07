import { ModelWithType } from "../../services/modelsService";

export const DefaultModel: ModelWithType = {
    type: 'openai',
    model: 'gpt-4o-mini',
}

export const modelFromString = (modelString: string): ModelWithType => {
    const [providerId, modelType] = modelString.split('/');
    return { type: providerId, model: modelType };
}

export const modelToString = (model: ModelWithType): string => {
    return `${model.type}/${model.model}`;
}

export const initialModelForKey = (key: string): ModelWithType => {
    const modelString = localStorage.getItem(key);
    if (modelString) {
        return modelFromString(modelString);
    }
    return DefaultModel;
}