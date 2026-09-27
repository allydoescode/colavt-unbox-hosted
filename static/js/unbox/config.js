// ==========================================
// 🕹️ CUSTOMIZABLE CONFIGURATION OPTIONS
// ==========================================
export const SPINNER_CONFIG = {
  cruiseDuration: 3500,     
  slowdownDuration: 4500,   
  startupAggression: 6,     
  
  // 📐 LAYOUT CONFIGURATIONS
  cardWidth: 200,           
  winningIndex: 90,         
  totalTapeCards: 120,      

  // 🕒 AUTOMATIC REVEAL TIMEOUT OVERLAY SYSTEM
  autoCloseDelay: 6000,    

  // 🎯 TICKER PHYSICS ADJUSTMENTS
  tickerWiggleIntensity: 6.5, 
  maxWiggleAngle: 35,         

  rarityWeights: {
    common: 68.6,     
    uncommon: 22, 
    rare: 7,        
    epic: 2,        
    legendary: 0.4     
  },

  // forcedWinner: 'Dragon Egg',
  
  // 🔊 AUDIO PERFORMANCE TRIMS
  audioTickFrequency: 1400, 
  audioTickDuration: 0.012, 
  audioVolume: 0.25          
};

// ==========================================
// 📦 GAME ITEMS POOL DEFINITIONS
// ==========================================
// export const itemPool = [
//   { name: 'Rusty Dagger', icon: '🗡️', rarity: 'common', description: 'A pitted blade. Better than bare fists, barely.' },
//   { name: 'Wooden Shield', icon: '🛡️', rarity: 'common', description: 'Splintered cedar bound by dry leather straps.' },
//   { name: 'Cloth Hood', icon: '🥷', rarity: 'common', description: 'Worn fabric optimized to slip silently into dark alleyways.' },
//   { name: 'Steel Sword', icon: '⚔️', rarity: 'rare', description: 'Forged under solid blacksmith iron pressure.' },
//   { name: 'Healing Potion', icon: '🧪', rarity: 'rare', description: 'A shimmering crimson fluid smelling faintly of distilled berries.' },
//   { name: 'Enchanted Bow', icon: '🏹', rarity: 'rare', description: 'The wood humming under an invisible atmospheric tension.' },
//   { name: 'Wizard Staff', icon: '🔮', rarity: 'epic', description: 'Channelling raw unstable leyline plasma forces.' },
//   { name: 'Shadow Armor', icon: '👕', rarity: 'epic', description: 'Plated mesh threads that swallow local light rays.' },
//   { name: 'Dragon Egg', icon: '🐉', rarity: 'legendary', description: 'Radiating immense internal geothermal volcanic heat ripples.' },
//   { name: 'Crown of Kings', icon: '👑', rarity: 'legendary', description: 'Ancient pure gold circlet commanding ultimate sovereign authority.' }
// ];

export const rarityColors = {
  common: { solid: '#888888', alpha: 'rgba(136, 136, 136, 0.4)' },
  uncommon: { solid: '#6bbf00', alpha: 'rgba(107, 191, 0, 0.4)'},
  rare: { solid: '#00b5f2', alpha: 'rgba(0, 181, 242, 0.4)' },
  epic: { solid: '#8733c6', alpha: 'rgba(135, 51, 198, 0.4)' },
  legendary: { solid: '#f7cd0f', alpha: 'rgba(247, 205, 15, 0.4)' }
};