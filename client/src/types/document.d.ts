export interface Document {
  authorId: string,
  id: string,
  text: string,
  title:string,
  updatedAt: Date,
  createdAt: Date,
  SharedDocument:SharedDocument,
}
export interface SharedDocument{
  document: Document,
  id:string,
  documentId:string,
  permissions: "EDIT" | "VIEW"
  updatedAt: Date,
  createdAt: Date,
}
