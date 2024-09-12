
export class Character {
  name: string;
  agentId: string;
  prompt: string;
  intros: string[];
  faceId: string;
  voiceId: string;

  constructor(json: any) {
    this.name = json.name;
    this.agentId = json.agentId;
    this.prompt = json.prompt;
    this.intros = json.intros;
    this.faceId = json.faceId;
    this.voiceId = json.voiceId;
  }
}

export const characterJenna = new Character(
  {
    name: 'Jenna',
    agentId: '5700930094ef0d36edf803bb7d6cb365',
    faceId: 'tmp9i8bbq7c',
    voiceId: '21m00Tcm4TlvDq8ikWAM',
  }
);
