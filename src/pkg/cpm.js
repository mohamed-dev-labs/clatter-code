import fs from 'fs-extra';
import path from 'path';
import { execa } from 'execa';
import chalk from 'chalk';

export class CPM {
  constructor() {
    this.pkgDir = path.join(process.env.HOME || process.env.USERPROFILE, '.clatter', 'packages');
    fs.ensureDirSync(this.pkgDir);
  }

  async install(pkgName) {
    console.log(chalk.cyan(`[CPM] Installing package: ${pkgName}...`));
    try {
      // In a real scenario, this would pull from a registry or GitHub
      // For now, we simulate by creating a local directory
      const targetDir = path.join(this.pkgDir, pkgName);
      await fs.ensureDir(targetDir);
      await fs.writeFile(path.join(targetDir, 'index.js'), `export const run = () => console.log('Running ${pkgName}');`);
      console.log(chalk.green(`[CPM] Successfully installed ${pkgName}`));
    } catch (error) {
      console.error(chalk.red(`[CPM] Installation failed: ${error.message}`));
    }
  }

  async execute(pkgName, args = []) {
    console.log(chalk.yellow(`[CPM] Executing: ${pkgName}...`));
    const pkgPath = path.join(this.pkgDir, pkgName, 'index.js');
    if (await fs.pathExists(pkgPath)) {
      const { run } = await import(`file://${pkgPath}`);
      await run(args);
    } else {
      console.log(chalk.red(`[CPM] Package ${pkgName} not found. Try: clatter install ${pkgName}`));
    }
  }

  async list() {
    const packages = await fs.readdir(this.pkgDir);
    console.log(chalk.bold('\nInstalled Clatter Packages:'));
    packages.forEach(pkg => console.log(`- ${pkg}`));
  }
}
