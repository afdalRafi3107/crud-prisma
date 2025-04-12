import { Response, Request } from "express";
import { prisma } from "../prisma/client";


//get all category
export const getAllCategory = async (req:Request, res:Response) =>{
    try {
        const getCategory = await prisma.category.findMany({
            include:{
                _count:{
                    select:{
                        produk:true
                    }
                }
            }
        });
        res.json(getCategory);
    } catch (error) {
        res.status(500).json({ error: "Failed to get Category" });
    }
}

//create Category

export const CreateCategory = async (req:Request, res:Response) =>{
    const {nameCategory} = req.body;
    console.log(nameCategory);
    
    try {
        const createCategory = await prisma.category.create({
            data:{
                nameCategory:nameCategory,
            }
        })
        res.json("berhasil membuat kategori baru")
    } catch (error) {
        res.status(500).json({ error: "Failed to create Category" });
    }
    
}

//update category
export const UpdateCategory = async (req: Request, res: Response) =>{

    try {
  
        const id = Number(req.params.id);
        const { nameCategory } = req.body;
        
        const data: any = {};
        if (nameCategory !== undefined) data.nameCategory = nameCategory;
  
        const updated = await prisma.category.update({
          where: { id },
         data,
        });
    
        res.json("berhasil memperbaharui kategori");
      
    } catch (error) {
      res.status(500).json({ error: "Failed to update Categori" });
    }
  
  }

//   delete category

export const deleteCategory = async  (req:Request, res:Response)=>{
    const id = Number(req.params.id);

    try {
        const deleteCategory = await prisma.category.delete({
            where:{id:id}
        })
      res.json("berhasil menghapus kategori")  
    } catch (error) {
        res.status(500).json({ error: "Failed to delete Categori" });
    }
}