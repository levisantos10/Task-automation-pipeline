import schedule
import time
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from config.database import get_connection
from executor import execute_task
from dotenv import load_dotenv

load_dotenv()

def run_pending_tasks():
    print(f"\n🔍 Verificando tarefas...")
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM tasks WHERE is_active = TRUE")
    tasks = cursor.fetchall()

    if not tasks:
        print("Nenhuma tarefa ativa encontrada.")
    else:
        for task in tasks:
            print(f"▶️  Executando: {task['name']}")
            execute_task(task)

    cursor.close()
    conn.close()

if __name__ == "__main__":
    print("🤖 Worker iniciado! Verificando tarefas a cada 60 segundos...")
    run_pending_tasks()
    schedule.every(60).seconds.do(run_pending_tasks)

    while True:
        schedule.run_pending()
        time.sleep(1)