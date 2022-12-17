output "aws_s3_bucket_storage" {
  value = aws_s3_bucket.storage.id
}

output "aws_dynamodb_table_blogLikes_id" {
  value = aws_dynamodb_table.blogLikes.id
}

output "netlify_access_key_id" {
  value = aws_iam_access_key.netlifyAccessKey.id
}

output "netlify_access_key_secret" {
  value = aws_iam_access_key.netlifyAccessKey.encrypted_secret
}
