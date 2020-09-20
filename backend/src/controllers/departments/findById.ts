import { getConnection, Like } from 'typeorm'
import { Department } from '../../entities/Department'

const findById = async (req, res) => {
  const DepartmentRepository = getConnection('sonia').getRepository(Department)
  const results = await DepartmentRepository.findByIds(req.params.id)
  
  if (results.length <= 0) {
    return res.status(404).json({
      messagem: 'Departmento não existe'
    })
  }
  
  const department = results[0]
  return res.status(200).json(department)
}

export { findById }
