export default interface Character {
    name: string,
    role: "Goalkeeper" | "Defender" | "Attacker" | "Striker" | "Leader" | "Assist"
    element: "Ardor" | "Whirlwind" | "Light" | "Thunder" | "Dark",
    ace: Ace,
    skills: skills
}

interface Ace {
    skill: string
}

interface skills {
    active: ActiveSkill
    passive: [PassiveSkill, PassiveSkill, PassiveSkill]
    finalTechnique?: FinalTechnique
    cooperationTechnique?: CooperationTechnique
}

interface ActiveSkill {
    spiritCost: number
    cooldown: number
    type: string
    name: string
    text: string
    effects: string[]
}

interface PassiveSkill {
    name: string
    text: string
    effect: string[]
}

interface FinalTechnique {
    avaliableAfterMinutes: number
    upToUsage: number
    cooldown: number
    text: string
    effects: string[]
}

interface CooperationTechnique {
    text: string
    cooldown: number
    upToUsage: number
    activatesWith: string
}