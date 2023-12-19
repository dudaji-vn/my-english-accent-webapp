export interface ISpeechRecognition {
    results: ISpeechRecognitionResult[];
    totalBilledTime: string;
    speechAdaptationInfo: ISpeechAdaptationInfo;
    requestId: string;
  }
  
  export interface ISpeechRecognitionResult {
    alternatives: ISpeechRecognitionAlternative[];
    channelTag: number;
    resultEndTime: string;
    languageCode: string;
  }
  
  export interface ISpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
    words: IWordInfo[];
  }
  
  export interface IWordInfo {
    startTime: string;
    endTime: string;
    word: string;
    confidence: number;
    speakerTag: number;
  }
  
  export interface ISpeechAdaptationInfo {
    adaptationTimeout: boolean;
    timeoutMessage: string;
  }