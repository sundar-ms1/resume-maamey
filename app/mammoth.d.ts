
declare module "mammoth/mammoth.browser" {
  export interface ExtractRawTextInput {
    arrayBuffer: ArrayBuffer;
  }

  export interface ExtractRawTextResult {
    value: string;
    messages: Array<{
      type: string;
      message: string;
    }>;
  }

  export function extractRawText(
    input: ExtractRawTextInput
  ): Promise<ExtractRawTextResult>;
}
