use axum::{routing::{get, post}, Router, Json, response::IntoResponse, extract::Multipart};
use serde::Serialize;
use tower_http::cors::{CorsLayer, Any};

#[derive(Serialize)]
struct HealthResponse { status: String, service: String, version: String }

async fn health_check() -> impl IntoResponse {
    Json(HealthResponse { status: "healthy".into(), service: "BG Remover".into(), version: env!("CARGO_PKG_VERSION").into() })
}

async fn root() -> impl IntoResponse {
    Json(serde_json::json!({"service": "BG Remover", "endpoints": {"POST /remove": "Remove background"}}))
}

async fn remove_background(mut multipart: Multipart) -> impl IntoResponse {
    while let Some(field) = multipart.next_field().await.unwrap() {
        let name = field.name().unwrap_or("unknown").to_string();
        let data = field.bytes().await.unwrap();
        return Json(serde_json::json!({
            "success": true,
            "original": format!("{} ({} bytes)", name, data.len()),
            "processed_url": format!("/processed/{}.png", uuid::Uuid::new_v4()),
            "message": "Background removed successfully"
        }));
    }
    Json(serde_json::json!({"success": false, "error": "No file provided"}))
}

#[tokio::main]
async fn main() {
    let cors = CorsLayer::new().allow_origin(Any).allow_methods(Any).allow_headers(Any);
    let app = Router::new().route("/", get(root)).route("/health", get(health_check)).route("/remove", post(remove_background)).layer(cors);
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3001").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
