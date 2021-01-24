import * as Yup from 'yup';
import neo4j from 'neo4j-driver';
import uuid from 'node-uuid';

require('dotenv/config');

class ClienteController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string()
        .required()
        .min(3),
      cpf: Yup.string()
        .required()
        .length(14),
      rg: Yup.string(),
      email: Yup.string(),
      telefone: Yup.string(),
      logradouro: Yup.string()
        .required()
        .min(3),
      numero: Yup.string(),
      bairro: Yup.string()
        .required()
        .min(3),
      cidade: Yup.string()
        .required()
        .min(3),
      estado: Yup.string()
        .required()
        .length(2),
      cep: Yup.string()
        .required()
        .length(9),
      complemento: Yup.string(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations failure' });
    }

    const { body } = req;
    const { cpf } = body;
    body.id = uuid.v4();

    const uri = process.env.NEO4J_URI;
    const user = process.env.NEO4J_USER;
    const password = process.env.NEO4J_PASS;

    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    const session = driver.session();
    try {
      const { records: exist } = await session.run(
        `MATCH (a:Cliente) WHERE a.cpf=$cpf RETURN a;`,
        {
          cpf,
        }
      );

      if (exist.length > 0) {
        return res.status(400).json({ message: 'CPF already registered!' });
      }

      const { records } = await session.run(
        `CREATE (a:Cliente { id:$id,  nome : $nome, cpf : $cpf, rg : $rg, email : $email, telefone : $telefone,
          logradouro : $logradouro, numero : $numero, bairro : $bairro, cidade : $cidade, estado : $estado,
          cep : $cep, complemento : $complemento }) RETURN a`,
        req.body
      );
      return res.json(records);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    } finally {
      session.close();
      driver.close();
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string()
        .required()
        .min(3),
      cpf: Yup.string()
        .required()
        .length(14),
      rg: Yup.string(),
      email: Yup.string(),
      telefone: Yup.string(),
      logradouro: Yup.string()
        .required()
        .min(3),
      numero: Yup.string(),
      bairro: Yup.string()
        .required()
        .min(3),
      cidade: Yup.string()
        .required()
        .min(3),
      estado: Yup.string()
        .required()
        .length(2),
      cep: Yup.string()
        .required()
        .length(9),
      complemento: Yup.string(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations failure' });
    }

    const { body } = req;
    const { id, cpf } = body;

    const uri = process.env.NEO4J_URI;
    const user = process.env.NEO4J_USER;
    const password = process.env.NEO4J_PASS;

    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    const session = driver.session();
    try {
      const { records: find } = await session.run(
        `MATCH (a:Cliente) WHERE a.id=$id RETURN a;`,
        {
          id,
        }
      );
      if (find.length == 0) {
        return res.status(400).json({ message: 'id not found!' });
      }

      const { records: exist } = await session.run(
        `MATCH (a:Cliente) WHERE a.cpf=$cpf AND a.id<>$id RETURN a;`,
        {
          id,
          cpf,
        }
      );
      if (exist.length > 0) {
        return res.status(400).json({ message: 'CPF already registered!' });
      }

      const records = await session.run(
        `MATCH (a:Cliente { id:$id }) SET a.nome = $nome, a.cpf = $cpf, a.rg = $rg, a.email = $email,
          a.telefone = $telefone, a.logradouro = $logradouro, a.numero = $numero, a.bairro = $bairro,
          a.cidade = $cidade, a.estado = $estado, a.cep = $cep, a.complemento = $complemento RETURN a`,
        req.body
      );
      return res.json(records);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    } finally {
      session.close();
      driver.close();
    }
  }

  async index(req, res) {
    const uri = process.env.NEO4J_URI;
    const user = process.env.NEO4J_USER;
    const password = process.env.NEO4J_PASS;

    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    const session = driver.session();
    try {
      const { records } = await session.run(`MATCH (a:Cliente) RETURN a;`);

      if (records.length > 0) {
        const result = records.map(record => record._fields[0].properties);
        return res.json(result);
      }

      return res.json({});
    } catch (error) {
      return res.status(400).json({ message: error.message });
    } finally {
      session.close();
      driver.close();
    }
  }

  async findOne(req, res) {
    const { id } = req.params;

    const uri = process.env.NEO4J_URI;
    const user = process.env.NEO4J_USER;
    const password = process.env.NEO4J_PASS;

    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    const session = driver.session();
    try {
      const { records } = await session.run(
        `MATCH (a:Cliente) WHERE a.id=$id RETURN a;`,
        {
          id,
        }
      );

      if (records.length > 0) {
        const result = records.map(record => record._fields[0].properties);
        return res.json(result);
      }
      return res.json({});
    } catch (error) {
      return res.status(400).json({ message: error.message });
    } finally {
      session.close();
      driver.close();
    }
  }

  async destroy(req, res) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations failure' });
    }
    const { id } = req.body;

    const uri = process.env.NEO4J_URI;
    const user = process.env.NEO4J_USER;
    const password = process.env.NEO4J_PASS;

    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    const session = driver.session();
    try {
      const {
        records,
      } = await session.run(`MATCH (a:Cliente {id: $id}) DELETE a;`, { id });
      return res.json(records);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    } finally {
      session.close();
      driver.close();
    }
  }
}

export default new ClienteController();
