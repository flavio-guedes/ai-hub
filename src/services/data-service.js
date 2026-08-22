/**
 * AI HUB — Data Service Layer
 *
 * Camada desacoplada para acesso a dados.
 * Implementação atual: mock local via JSON.
 * Futuramente: substituir por chamadas HTTP reais sem alterar a interface.
 */

export const ENDPOINTS = {
  DATA: './src/data/ai-hub.json',
  AGENTS: '/api/agents',
  PROJECTS: '/api/projects',
  TASKS: '/api/tasks',
  ACTIVITIES: '/api/activities'
};

export class DataService {
  constructor() {
    this.source = 'mock';
  }

  async fetchAll() {
    if (this.source === 'mock') {
      const res = await fetch(ENDPOINTS.DATA, { cache: 'no-store' });
      if (!res.ok) throw new Error('Falha ao carregar dados');
      return await res.json();
    }
    // Future: real API integration
    const [agents, projects, tasks, activities] = await Promise.all([
      fetch(ENDPOINTS.AGENTS).then(r => r.json()),
      fetch(ENDPOINTS.PROJECTS).then(r => r.json()),
      fetch(ENDPOINTS.TASKS).then(r => r.json()),
      fetch(ENDPOINTS.ACTIVITIES).then(r => r.json())
    ]);
    return { humans: [], agents, projects, tasks, feed: activities };
  }

  setSource(source) {
    if (!['mock', 'api'].includes(source)) throw new Error('Fonte inválida');
    this.source = source;
  }
}

export const dataService = new DataService();
