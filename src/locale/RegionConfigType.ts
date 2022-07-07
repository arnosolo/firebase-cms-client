import { reactive } from 'vue'

export interface RegionConfigType {
  colors: Array<string>;
}

export class RegionConfig {
  configs: Object;
  availableRegions: Array<string>;
  private _region: string;
  config: RegionConfigType;
  constructor(configs:Object) {
    this.configs = configs
    this.availableRegions = Object.keys(configs)
    this._region = this.availableRegions[0]
    // @ts-ignore
    this.config = this.configs[this._region]
  }

  get region() {
    return this._region
  }

  set region(newRegion: string) {
    if (new Set(this.availableRegions).has(newRegion)) {
      this._region = newRegion
      // @ts-ignore
      this.config = this.configs[newRegion]
    } else {
      console.log(`newRegion ${newRegion} is not available`);
    }
  }
}
