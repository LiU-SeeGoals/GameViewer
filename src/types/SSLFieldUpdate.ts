import { Ball } from './Ball'
import { Robot } from './Robot'

export type SSLFieldUpdate = {
    balls: Ball[],
    robotsBlue: Robot[],
    robotsYellow: Robot[]
}