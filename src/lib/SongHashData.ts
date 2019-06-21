import path from 'path';
import fs from 'fs';
import {promisify} from 'util';
import { remote } from 'electron';

const readFile = promisify(fs.readFile);

interface SongHash {
  songHash: string;
}

export default class SongHashData {

  public static async data(): Promise<{ [key: string]: SongHash }> {
    if (this.Hash === undefined) {
      const songHashFile = path.join(remote.app.getPath('appData'), '..',
        'LocalLow\\Hyperbolic Magnetism\\Beat Saber\\SongHashData.dat');
      const rawJson = await readFile(songHashFile);
      this.Hash = this.ToSongHashData(rawJson.toString());
    }
    return this.Hash;
  }

  private static Hash: { [key: string]: SongHash };

  private static ToSongHashData(json: string): { [key: string]: SongHash } {
    return JSON.parse(json);
  }

}
