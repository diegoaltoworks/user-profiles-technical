# main.tf
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# Load variables from .env file
data "local_file" "env" {
  filename = "${path.module}/../.env"
}

# Data source for the current project
data "google_project" "project" {}

data "google_secret_manager_secret_version" "turso_database_url" {
  provider = google
  secret   = "TURSO_DATABASE_URL"
  project  = data.google_project.project.number
}

data "google_secret_manager_secret_version" "turso_auth_token" {
  provider = google
  secret   = "TURSO_AUTH_TOKEN"
  project  = data.google_project.project.number
}

# Locals block to set the values
locals {
  turso_database_url = data.google_secret_manager_secret_version.turso_database_url.secret_data
  turso_auth_token   = data.google_secret_manager_secret_version.turso_auth_token.secret_data

  # Parse .env file
  env_content = try(data.local_file.env.content, "")
  env_vars = { for line in split("\n", local.env_content) :
    split("=", line)[0] => split("=", line)[1] if length(split("=", line)) == 2
  }

  # Load non-sensitive variables from .env with default values
  project_name                = lookup(local.env_vars, "PROJECT_NAME", "default_project_name")
  project_version             = lookup(local.env_vars, "PROJECT_VERSION", "default_version")
  next_public_api_host        = lookup(local.env_vars, "NEXT_PUBLIC_API_HOST", "default_api_host")
  next_public_web_host        = lookup(local.env_vars, "NEXT_PUBLIC_WEB_HOST", "default_web_host")
  next_public_github_username = lookup(local.env_vars, "NEXT_PUBLIC_GITHUB_USERNAME", "default_github_username")
}

# Output for debugging
output "env_file_content" {
  value     = local.env_content
  sensitive = true
}

output "parsed_env_vars" {
  value     = local.env_vars
  sensitive = true
}

# Output the values of the variables
output "env_variables" {
  value = {
    project_name                = local.project_name
    project_version             = local.project_version
    next_public_api_host        = local.next_public_api_host
    next_public_web_host        = local.next_public_web_host
    next_public_github_username = local.next_public_github_username
  }
  sensitive = true
}
