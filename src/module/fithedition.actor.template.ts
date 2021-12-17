export interface FifthAbilities {
  str: {
    value: number;
    proficient: number;
    bonuses?: {
      check: string;
      save: string;
    };
  };
  dex: {
    value: number;
    proficient: number;
    bonuses?: {
      check: string;
      save: string;
    };
  };
  con: {
    value: number;
    proficient: number;
    bonuses?: {
      check: string;
      save: string;
    };
  };
  int: {
    value: number;
    proficient: number;
    bonuses?: {
      check: string;
      save: string;
    };
  };
  wis: {
    value: number;
    proficient: number;
    bonuses?: {
      check: string;
      save: string;
    };
  };
  cha: {
    value: number;
    proficient: number;
    bonuses?: {
      check: string;
      save: string;
    };
  };
}

export interface FifthEditionActor {
  abilities: FifthAbilities;
  attributes: {
    ac: {
      flat: number;
      calc: string;
      formula: string;
    };
    hp: {
      value: number;
      min: number;
      max: number;
      temp?: number;
      tempmax?: number;
    };
    init?: {
      value: number;
      bonus: number;
    };
    movement: {
      burrow?: number;
      climb?: number;
      fly?: number;
      swim?: number;
      walk: number;
      units: 'ft';
      hover: boolean;
    };
  };
  details?: {
    biography: {
      value?: string;
      public?: string;
    };
  };
  traits?: {
    size?: 'med' | 'large' | 'tiny';
    di?: {
      value: string[];
      custom?: string;
    };
    dr?: {
      value?: string[];
      custom?: string;
    };
  };
  skills: {
    acr: {
      value: number;
      ability: 'dex';
      bonuses: {
        check?: string;
        passive?: string;
      };
    };
    ani: {
      value: number;
      ability: 'wis';
      bonuses: {
        check?: string;
        passive?: string;
      };
    };
    arc: {
      value: number;
      ability: 'int';
      bonuses: {
        check?: string;
        passive?: string;
      };
    };
    ath: {
      value: number;
      ability: 'str';
      bonuses: {
        check?: string;
        passive?: string;
      };
    };
    dec: {
      value: number;
      ability: 'cha';
      bonuses: {
        check?: string;
        passive?: string;
      };
    };
    his: {
      value: number;
      ability: 'int';
      bonuses: {
        check?: string;
        passive?: string;
      };
    };
    ins: {
      value: number;
      ability: 'wis';
      bonuses: {
        check?: string;
        passive?: string;
      };
    };
    itm: {
      value: number;
      ability: 'cha';
      bonuses: {
        check?: string;
        passive?: string;
      };
    };
    inv: {
      value: number;
      ability: 'int';
      bonuses: {
        check?: string;
        passive?: string;
      };
    };
    med: {
      value: number;
      ability: 'wis';
      bonuses: {
        check?: string;
        passive?: string;
      };
    };
    nat: {
      value: number;
      ability: 'int';
      bonuses: {
        check?: string;
        passive?: string;
      };
    };
    prc: {
      value: number;
      ability: 'wis';
      bonuses: {
        check?: string;
        passive?: string;
      };
    };
    prf: {
      value: number;
      ability: 'cha';
      bonuses: {
        check?: string;
        passive?: string;
      };
    };
    per: {
      value: number;
      ability: 'cha';
      bonuses: {
        check?: string;
        passive?: string;
      };
    };
    rel: {
      value: number;
      ability: 'int';
      bonuses: {
        check?: string;
        passive?: string;
      };
    };
    slt: {
      value: number;
      ability: 'dex';
      bonuses: {
        check?: string;
        passive?: string;
      };
    };
    sur: {
      value: number;
      ability: 'wis';
      bonuses: {
        check?: string;
        passive?: string;
      };
    };
  };
}
