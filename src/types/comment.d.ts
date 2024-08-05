

export interface CreateCommentType {
    question_id : any
    parent_comment_id? :string | null
    body : string
}