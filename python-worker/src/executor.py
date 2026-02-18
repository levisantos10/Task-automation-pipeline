from config.database import get_connection
from tasks.website_monitor import check_website
from tasks.weather_checker import get_weather
from datetime import datetime

def execute_task(task):
    task_id = task["id"]
    task_type = task["task_type"]
    description = task["description"]

    conn = get_connection()
    cursor = conn.cursor()

    # Criar registro de execução
    cursor.execute(
        "INSERT INTO executions (task_id, status, started_at) VALUES (%s, %s, %s)",
        (task_id, "running", datetime.now())
    )
    execution_id = cursor.lastrowid
    conn.commit()

    try:
        # Executar a tarefa correta
        if task_type == "website_monitor":
            result = check_website(description)
        elif task_type == "weather_check":
            result = get_weather(description)
        else:
            result = {"success": False, "message": f"Tipo de tarefa desconhecido: {task_type}"}

        # Salvar resultado
        status = "success" if result["success"] else "failed"
        cursor.execute(
            "UPDATE executions SET status=%s, finished_at=%s, result=%s WHERE id=%s",
            (status, datetime.now(), result["message"], execution_id)
        )

        # Salvar log
        level = "info" if result["success"] else "error"
        cursor.execute(
            "INSERT INTO logs (execution_id, level, message) VALUES (%s, %s, %s)",
            (execution_id, level, result["message"])
        )

        conn.commit()
        print(f"[{status.upper()}] {result['message']}")

    except Exception as e:
        cursor.execute(
            "UPDATE executions SET status=%s, finished_at=%s, error_message=%s WHERE id=%s",
            ("failed", datetime.now(), str(e), execution_id)
        )
        cursor.execute(
            "INSERT INTO logs (execution_id, level, message) VALUES (%s, %s, %s)",
            (execution_id, "error", str(e))
        )
        conn.commit()
        print(f"[ERROR] {str(e)}")

    finally:
        cursor.close()
        conn.close()