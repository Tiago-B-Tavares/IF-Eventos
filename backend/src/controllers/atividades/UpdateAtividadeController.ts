import { Request, Response } from "express";
import { UpdateAtividadesService } from "../../services/atividades/UpdateAtividadesService";

class UpdateAtividadeController {
    async handle(req: Request, res: Response) {
        const id = req.query.id as string;
        const { nome, descricao, local, horario, vagas, ch, concomitante } = req.body;
       

        const updateAtividadesService = new UpdateAtividadesService();

        try {
            Number(ch)
            const atividade = await updateAtividadesService.execute({
                id, local, horario, ch, concomitante, nome, descricao, vagas
            });

            // Retorna a resposta bem-sucedida
            return res.json(atividade);

        } catch (error: any) {
            console.error("Erro ao atualizar a atividade:", error);

            // Retorna um erro 500 se algo deu errado durante a atualização
            return res.status(500).json({ message: `Erro ao atualizar a atividade: ${error.message}` });
        }
    }
}

export { UpdateAtividadeController };
