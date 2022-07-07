import { reactive } from 'vue'
import { cn } from "./region/cn";
import { tw } from "./region/tw";
import { us } from "./region/us";
import { RegionConfig } from "./RegionConfigType";

const configs = {
  cn, tw, us
}

export const regionConfig = reactive<RegionConfig>(new RegionConfig(configs))