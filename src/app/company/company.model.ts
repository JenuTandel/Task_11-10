export class Company{
    id!:number;
    companyName!:string;
    companyDescription!:string;
    companyTags!:[{
        tag_text:string
    }];
    companyLogo!:string;
}