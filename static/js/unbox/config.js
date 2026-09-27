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


export const rarityColors = {
  common: { solid: '#888888', alpha: 'rgba(136, 136, 136, 0.4)' },
  uncommon: { solid: '#6bbf00', alpha: 'rgba(107, 191, 0, 0.4)'},
  rare: { solid: '#00b5f2', alpha: 'rgba(0, 181, 242, 0.4)' },
  epic: { solid: '#8733c6', alpha: 'rgba(135, 51, 198, 0.4)' },
  legendary: { solid: '#f7cd0f', alpha: 'rgba(247, 205, 15, 0.4)' }
};