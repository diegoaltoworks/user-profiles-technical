
variable "project_id" {
  description = "Google Cloud Project ID"
  default     = "dworks-userpt"
}

variable "region" {
  description = "Google Cloud region"
  default     = "europe-europe4"
}

variable "web_image_tag" {
  description = "The tag for the web image"
  type        = string
}

variable "api_image_tag" {
  description = "The tag for the api image"
  type        = string
}
