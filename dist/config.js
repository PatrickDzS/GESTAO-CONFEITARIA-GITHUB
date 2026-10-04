// Conexao com o Supabase. Este arquivo NAO passa pelo build:
// o site conecta no banco mesmo sem nenhuma variavel de ambiente na hospedagem.
// A chave anon e publica por design (as regras RLS protegem seus dados).
window.__SUPABASE__ = {
  url: 'https://kdeqpsomfmpbygwrowoc.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkZXFwc29tZm1wYnlnd3Jvd29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxOTg5ODAsImV4cCI6MjEwNTc3NDk4MH0.ucsHaCBiWadXl8a3qrpxGeZsnZtGGHX9Srau1eJdQmI'
};