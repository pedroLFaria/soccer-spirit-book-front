export default interface Character{
    name: string,
    role: "Goalkeeper" | "Defender" | "Attacker" | "Striker" | "Leader" | "Assist"
    element: "Ardor" | "Whirlwind" | "Light" | "Thunder" | "Dark",
    ace: Ace,
    skills: skills
}

interface Ace {
    skill: string
    burst?: string
    dualBurst?: string
}

interface skills {
    active: ActiveSkill
    passive: [PassiveSkill, PassiveSkill, PassiveSkill]
}

interface ActiveSkill{
    spiritCost: number
    cooldown: number
    name: string
    text: string
    effects: string[]
}

interface PassiveSkill{
    name: string
    text: string
    effect: string[]
}