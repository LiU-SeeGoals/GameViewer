import { AIBall } from './AIBall'
import { AIRobot } from './AIRobot'
import { Action } from './Action'

export type AIRobotUpdate = {
    Robots: AIRobot[]
	BallPosition: AIBall
	RobotActions: Action[]
}