

export interface CreateCommentType {
    question_id : string
    parent_comment_id? :string | null
    body : string
}