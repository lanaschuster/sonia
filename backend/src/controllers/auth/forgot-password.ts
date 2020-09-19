import { getConnection } from 'typeorm'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { User } from '../../entities/User'


const forgotPassword = async (req, res) => {
  // TODO
}

export { forgotPassword }
