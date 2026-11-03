'use client';

import React, { useState } from 'react';
import {
  MessageSquareShare,
  Plus,
  Send,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Phone,
  Mail,
  Sliders,
} from 'lucide-react';
import { useTenant } from '@/lib/tenantContext';
import { INITIAL_TEMPLATES, INITIAL_WORKFLOWS } from '@/lib/mockData';
import { MessageTemplate, AutomationWorkflow } from '@/types';

export default function CommunicationsPage() {
  const { currentCompany } = useTenant();
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'workflows' | 'templates'>('whatsapp');
  const [templates, setTemplates] = useState<MessageTemplate[]>(INITIAL_TEMPLATES);
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>(INITIAL_WORKFLOWS);

  // Live WhatsApp Chat Tester
  const [customerPhone, setCustomerPhone] = useState('+91 98412 88491');
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0]?.id || '');
  const [chatLog, setChatLog] = useState([
    { sender: 'bot', text: 'Namaste Deepak Singhal, welcome to Prestige Falcon City Ph 2! Here is your digital brochure: https://estateflow.io/b/pfc2', time: '10:32 AM' },
    { sender: 'customer', text: 'Thank you! Is Tower A 5th floor 3 BHK still available?', time: '10:35 AM' },
  ]);
  const [replyText, setReplyText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText) return;
    setChatLog([...chatLog, { sender: 'bot', text: replyText, time: 'Just now' }]);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-card border border-estate-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-estate-navy">WhatsApp & Email Omnichannel Automation</h1>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Meta Cloud API Connected
            </span>
          </div>
          <p className="text-xs text-estate-muted mt-0.5">
            Verified WhatsApp Business messaging templates, automated drip sequences, and SLA alerts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('workflows')}
            className="px-3.5 py-2 bg-estate-blue hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm flex items-center gap-1.5"
          >
            <Zap size={14} />
            <span>Visual Workflow Builder</span>
          </button>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-estate-border bg-white px-4 rounded-t-card text-xs font-bold">
        {[
          { id: 'whatsapp', label: 'Live WhatsApp Console' },
          { id: 'workflows', label: 'Automated Drip Workflows' },
          { id: 'templates', label: 'Meta Approved Templates' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`py-3.5 px-4 border-b-2 transition-all ${
              activeTab === t.id
                ? 'border-estate-blue text-estate-blue'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab 1: WhatsApp Live Console */}
      {activeTab === 'whatsapp' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Template Sender */}
          <div className="bg-white p-5 rounded-card border border-estate-border shadow-sm space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-estate-navy">Direct Template Dispatch</h3>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Customer Phone</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Approved Template</label>
              <select
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-input"
              >
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} ({t.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-600">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Template Body</span>
              <p className="text-[11px] leading-relaxed">
                {templates.find((t) => t.id === selectedTemplateId)?.content}
              </p>
            </div>

            <button
              onClick={() => {
                const tmpl = templates.find((t) => t.id === selectedTemplateId);
                if (tmpl) {
                  setChatLog([...chatLog, { sender: 'bot', text: tmpl.content, time: 'Just now' }]);
                }
              }}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center justify-center gap-1.5 shadow"
            >
              <Send size={14} />
              <span>Dispatch Template via Meta Cloud API</span>
            </button>
          </div>

          {/* Interactive Chat Sandbox Preview */}
          <div className="lg:col-span-2 bg-[#efeae2] rounded-card border border-slate-300 shadow-sm flex flex-col h-[520px] overflow-hidden">
            {/* WhatsApp Top Header */}
            <div className="bg-[#17324D] text-white p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs">
                  DS
                </div>
                <div>
                  <p className="font-bold text-xs">Deepak Singhal</p>
                  <p className="text-[10px] text-teal-300 font-mono">{customerPhone}</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-600/60 px-2 py-0.5 rounded text-white font-semibold">
                Official Business Account
              </span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {chatLog.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'bot' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-xl shadow-sm text-slate-800 leading-relaxed ${
                      msg.sender === 'bot' ? 'bg-[#d9fdd3] rounded-tr-none' : 'bg-white rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[9px] text-slate-400 block text-right mt-1 font-mono">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="bg-white p-3 border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type real estate reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-100 border border-slate-300 rounded-input text-xs focus:outline-none focus:bg-white"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 2: Visual Workflow Builder */}
      {activeTab === 'workflows' && (
        <div className="bg-white rounded-card border border-estate-border shadow-sm p-6 text-xs space-y-6">
          <div>
            <h3 className="font-extrabold text-sm text-estate-navy">Automated Drip Sequences</h3>
            <p className="text-slate-500 text-xs mt-0.5">
              Trigger actions immediately upon lead creation, site visit schedules, or payment milestones
            </p>
          </div>

          <div className="space-y-6">
            {workflows.map((wf) => (
              <div key={wf.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <strong className="text-sm font-bold text-estate-navy">{wf.name}</strong>
                  </div>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    Trigger: {wf.trigger}
                  </span>
                </div>

                {/* Steps Horizontal Flow */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
                  {wf.steps.map((step, sIdx) => (
                    <div key={step.id} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm relative">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold mb-1">
                        <span>Step {sIdx + 1}</span>
                        <span className="text-estate-teal">{step.delay}</span>
                      </div>
                      <p className="font-bold text-slate-800 text-xs">{step.action}</p>
                      <p className="text-[11px] text-slate-500 mt-1">{step.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Approved Templates */}
      {activeTab === 'templates' && (
        <div className="bg-white rounded-card border border-estate-border shadow-sm p-6 text-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((t) => (
              <div key={t.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 text-sm">{t.title}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Approved
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">{t.content}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Category: {t.category}</span>
                  <span className="font-mono">{t.channel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

