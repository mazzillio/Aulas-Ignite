export class ImportCategoryService {
  execute(file: Express.Multer.File): void {
    console.log(file);
  }
}
