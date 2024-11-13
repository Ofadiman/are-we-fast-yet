/**
 * Utility script used to generate hardware info for benchmarks.
 *
 * Usage:
 *   tsx hardware.mts
 */

import * as si from "systeminformation";
import { filesize } from "filesize";

const cpu = await si.cpu();
const graphics = await si.graphics();
const diskLayout = await si.diskLayout();
const memLayout = await si.memLayout();
const baseboard = await si.baseboard();

const hardware = `## Hardware

- CPU: \`${cpu.brand}\`
- GPU: \`${graphics.controllers[0]!.name}\`
- Motherboard: \`${baseboard.model}\`
- RAM: \`${filesize(memLayout[0]!.size, { base: 2 })}\`
- Disk: \`${diskLayout[0]!.name}, ${filesize(diskLayout[0]!.size, { base: 2 })}\``;

console.log(hardware);
