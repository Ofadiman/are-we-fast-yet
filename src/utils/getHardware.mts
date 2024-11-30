import * as si from "systeminformation";
import { filesize } from "filesize";

export const getHardware = async () => {
  const cpu = await si.cpu();
  const graphics = await si.graphics();
  const diskLayout = await si.diskLayout();
  const memLayout = await si.memLayout();
  const baseboard = await si.baseboard();

  return {
    cpu: cpu.brand,
    gpu: graphics.controllers[0]!.name!,
    motherboard: baseboard.model,
    ram: filesize(memLayout[0]!.size, { base: 2 }),
    disk: `${diskLayout[0]!.name}, ${filesize(diskLayout[0]!.size, { base: 2 })}`,
  };
};
