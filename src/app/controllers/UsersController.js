// import * as Yup from 'yup';

// import MobileUsers from '../models/MobileUsers';
// import MobileFiles from '../models/MobileFiles';

// class UsersController {
//   async store(req, res) {
//     const schema = Yup.object().shape({
//       name: Yup.string().required(),
//       email: Yup.string()
//         .email()
//         .required(),
//       password: Yup.string()
//         .required()
//         .min(6),
//       fk_login: Yup.number()
//         .integer()
//         .required(),
//     });

//     if (!(await schema.isValid(req.body))) {
//       return res.status(400).json({ error: 'Validations fails' });
//     }

//     const exist = await MobileUsers.findOne({
//       where: {
//         email: req.body.email,
//       },
//     });

//     if (exist) {
//       return res.status(400).json({ error: 'User already exists.' });
//     }

//     const user = await MobileUsers.create(req.body);
//     return res.json(user);
//   }

//   async update(req, res) {
//     const schema = Yup.object().shape({
//       oldPassword: Yup.string().min(6),
//       password: Yup.string()
//         .min(6)
//         .when('oldPassword', (oldPassword, field) =>
//           oldPassword ? field.required() : field
//         ),
//       confirmPassword: Yup.string().when('password', (password, field) =>
//         password ? field.required().oneOf([Yup.ref('password')]) : field
//       ),
//     });

//     if (!(await schema.isValid(req.body))) {
//       return res.status(400).json({ error: 'Validations fails' });
//     }

//     const { email, oldPassword } = req.body;

//     const user = await MobileUsers.findByPk(req.userId);

//     if (oldPassword && !(await user.checkPassword(oldPassword))) {
//       return res.status(401).json({ error: 'Senha não corresponde' });
//     }

//     const { id, name, provider } = await user.update(req.body);

//     return res.json({
//       id,
//       name,
//       email,
//       provider,
//     });
//   }

//   async updateAvatar(req, res) {
//     const schema = Yup.object().shape({
//       avatar_id: Yup.number().required(),
//     });

//     if (!(await schema.isValid(req.body))) {
//       return res.status(400).json({ error: 'Validations fails' });
//     }

//     const user = await MobileUsers.findByPk(req.userId);
//     await user.update(req.body);

//     const { id, name, email, cpf, avatar } = await MobileUsers.findByPk(
//       req.userId,
//       {
//         include: [
//           {
//             model: MobileFiles,
//             as: 'avatar',
//             attributes: ['id', 'name', 'url', 'path'],
//           },
//         ],
//       }
//     );
//     return res.json({
//       id,
//       name,
//       cpf,
//       email,
//       avatar,
//     });
//   }
// }

// export default new UsersController();
