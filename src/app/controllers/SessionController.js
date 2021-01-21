// import jwt from 'jsonwebtoken';
// import * as Yup from 'yup';

// import MobileUsers from '../models/MobileUsers';
// import MobileFiles from '../models/MobileFiles';
// import auth from '../../config/auth';

// class SessionController {
//   async store(req, res) {
//     const schema = Yup.object().shape({
//       cpf: Yup.string().required(),
//       password: Yup.string().required(),
//     });
//     if (!(await schema.isValid(req.body))) {
//       return res.status(400).json({ error: 'Validations fails' });
//     }
//     const { cpf, password } = req.body;

//     const user = await MobileUsers.findOne({
//       where: {
//         cpf,
//       },
//       // ? seleciona somente essas colunas
//       // attributes: ['id', 'name', 'email'],
//       // ? Inner join entre model's
//       include: [
//         {
//           model: MobileFiles,
//           as: 'avatar',
//           attributes: ['id', 'name', 'url', 'path'],
//         },
//       ],
//     });

//     if (!user) {
//       return res.status(401).json({ error: 'User not found' });
//     }

//     if (!user.status) {
//       return res.status(401).json({ error: 'user disabled' });
//     }

//     if (!(await user.checkPassword(password))) {
//       return res.status(401).json({ error: 'password does not match' });
//     }

//     const { id, name, email, avatar } = user;

//     return res.json({
//       user: {
//         id,
//         name,
//         cpf,
//         email,
//         avatar,
//       },
//       token: jwt.sign({ id }, auth.secret, {
//         expiresIn: auth.expiresIn,
//       }),
//     });
//   }

//   async getUserEnable(req, res) {
//     const schema = Yup.object().shape({
//       cpf: Yup.string().required(),
//     });
//     if (!(await schema.isValid(req.body))) {
//       return res.status(400).json({ error: 'Validations fails' });
//     }
//     const { cpf } = req.body;
//     const user = await MobileUsers.findOne({
//       where: {
//         cpf,
//         status: true,
//       },
//     });

//     if (user) {
//       const { id, name, email, avatar } = user;

//       return res.json({
//         user: {
//           id,
//           name,
//           cpf,
//           email,
//           avatar,
//         },
//       });
//     }
//     return res.status(401).json({ error: 'user disabled' });
//   }
// }

// export default new SessionController();
