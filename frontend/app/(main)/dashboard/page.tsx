'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const technicalStackSchema = z.object({
  frontend: z.array(z.string()),
  backend: z.array(z.string()),
  database: z.array(z.string()),
  devops: z.array(z.string()),
  other: z.array(z.string()).optional(),
});

const databaseRequirementsSchema = z.object({
  type: z.string(),
  scaling_requirements: z.string().optional(),
  backup_requirements: z.string().optional(),
  security_requirements: z.string().optional(),
  specific_requirements: z.array(z.string()).optional(),
});

const apiRequirementsSchema = z.object({
  authentication_type: z.string(),
  rate_limiting: z.boolean().optional(),
  versioning: z.boolean().optional(),
  documentation_requirements: z.string().optional(),
  specific_endpoints: z.array(z.string()).optional(),
});

const securityRequirementsSchema = z.object({
  authentication: z.array(z.string()),
  authorization: z.array(z.string()),
  data_encryption: z.array(z.string()),
  compliance_requirements: z.array(z.string()).optional(),
  specific_security_measures: z.array(z.string()).optional(),
});

const systemArchitectureSchema = z.object({
  architecture_type: z.string(),
  deployment_strategy: z.string().optional(),
  scaling_strategy: z.string().optional(),
  specific_requirements: z.array(z.string()).optional(),
});

const proposalSchema = z.object({
  project_name: z.string().min(1),
  client_name: z.string().min(1),
  industry: z.string().min(1),
  timeline: z.string().min(1),
  budget: z.number().optional(),
  description: z.string().optional(),
  technical_stack: technicalStackSchema,
  database_requirements: databaseRequirementsSchema,
  api_requirements: apiRequirementsSchema,
  security_requirements: securityRequirementsSchema,
  system_architecture: systemArchitectureSchema,
  include_diagrams: z.boolean().default(true),
  diagram_types: z.array(z.string()).optional(),
});

export default function DashboardPage() {
  const { register, handleSubmit, control } = useForm({
    resolver: zodResolver(proposalSchema),
  });

  const { fields: frontendFields, append: appendFrontend } = useFieldArray({
    control,
    name: "technical_stack.frontend",
  });

  const { fields: backendFields, append: appendBackend } = useFieldArray({
    control,
    name: "technical_stack.backend",
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/generate-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      // Handle response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Technical Proposal</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input {...register("project_name")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Client Name</label>
              <input {...register("client_name")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Industry</label>
              <input {...register("industry")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Timeline</label>
              <input {...register("timeline")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
          </div>
        </div>

        {/* Technical Stack */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Technical Stack</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Frontend Technologies</label>
              {frontendFields.map((field, index) => (
                <input key={field.id} {...register(`technical_stack.frontend.${index}`)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              ))}
              <button type="button" onClick={() => appendFrontend("")} className="mt-2 text-blue-600">+ Add Frontend Tech</button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Backend Technologies</label>
              {backendFields.map((field, index) => (
                <input key={field.id} {...register(`technical_stack.backend.${index}`)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
              ))}
              <button type="button" onClick={() => appendBackend("")} className="mt-2 text-blue-600">+ Add Backend Tech</button>
            </div>
          </div>
        </div>

        {/* Database Requirements */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Database Requirements</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Database Type</label>
              <select {...register("database_requirements.type")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="SQL">SQL</option>
                <option value="NoSQL">NoSQL</option>
                <option value="Graph">Graph</option>
                <option value="Time Series">Time Series</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Scaling Requirements</label>
              <textarea {...register("database_requirements.scaling_requirements")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
          </div>
        </div>

        {/* API Requirements */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">API Requirements</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Authentication Type</label>
              <select {...register("api_requirements.authentication_type")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="JWT">JWT</option>
                <option value="OAuth">OAuth</option>
                <option value="API Key">API Key</option>
              </select>
            </div>
            <div className="flex items-center">
              <input type="checkbox" {...register("api_requirements.rate_limiting")} className="rounded border-gray-300" />
              <label className="ml-2 text-sm font-medium text-gray-700">Rate Limiting Required</label>
            </div>
          </div>
        </div>

        {/* Security Requirements */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Security Requirements</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Authentication Methods</label>
              <select multiple {...register("security_requirements.authentication")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="JWT">JWT</option>
                <option value="OAuth">OAuth</option>
                <option value="SAML">SAML</option>
                <option value="LDAP">LDAP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Data Encryption</label>
              <select multiple {...register("security_requirements.data_encryption")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="AES">AES</option>
                <option value="RSA">RSA</option>
                <option value="TLS">TLS</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Architecture */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">System Architecture</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Architecture Type</label>
              <select {...register("system_architecture.architecture_type")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="Monolithic">Monolithic</option>
                <option value="Microservices">Microservices</option>
                <option value="Serverless">Serverless</option>
                <option value="Event-Driven">Event-Driven</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Deployment Strategy</label>
              <select {...register("system_architecture.deployment_strategy")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="Cloud">Cloud</option>
                <option value="On-Premise">On-Premise</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Generate Proposal
        </button>
      </form>
    </div>
  );
} 