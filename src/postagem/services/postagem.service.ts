import { HttpException, 
         Injectable, 
         HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult } from "typeorm/browser";

@Injectable()
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private readonly postagemRepository: Repository<Postagem>

    ){}
    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find()
    }

    async findById(id: number):Promise<Postagem>{
        const postagem = await this.postagemRepository.findOne({
            where: {
                id,
            },
        })
        if(!postagem) {
            throw new HttpException('A postagem não foi encontrada', HttpStatus.NOT_FOUND,);
        }
            return postagem;
    }

    async findAllByTitulo(titulo: string): Promise<Postagem[]> {
        const postagem = await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            }
        })
        if(!postagem) {
            throw new HttpException('A postagem não foi encontrada', HttpStatus.NOT_FOUND)
        }
        return postagem
    }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem)
    }

    async update(postagem: Postagem): Promise<Postagem> {
        await this.findById(postagem.id)
        return await this.postagemRepository.save(postagem)
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id)
        return await this.postagemRepository.delete(id)
    }
}
