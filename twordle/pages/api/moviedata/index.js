import {movienames} from '../../../moviedb'

export default function handler(req, res) {
    res.status(200).json(movienames)
}