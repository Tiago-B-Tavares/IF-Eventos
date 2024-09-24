import { UpdateColaboradorService } from "../../services/colaboradores/UpdateColaboradorService";
import { Request, Response } from "express";
class UpdateColaboradorController {
    async handle(req: Request, res: Response) {


        try {
            const { nome } = req.body;

            const id = req.query.id as string

            const colaborador = new UpdateColaboradorService()

            const update = await colaborador.execute({
                id,
                nome
            })
            return res.json("alterado com sucesso")
        } catch (error) {
            console.error("Erro na solocitação", error)
        }

    }
}
export { UpdateColaboradorController }