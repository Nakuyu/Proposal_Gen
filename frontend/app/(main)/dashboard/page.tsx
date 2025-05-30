'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const proposalSchema = z.object({
  clientName: z.string().min(1),
  industry: z.string().min(1),
  timeline: z.string().min(1),
  techStack: z.array(z.string()),
  budget: z.number().optional(),
  description: z.string().optional(),
});

export default function DashboardPage() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(proposalSchema),
  });

  const onSubmit = async (data: any) => {
    // TODO: Implement proposal generation
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Proposal</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* TODO: Add form fields */}
      </form>
    </div>
  );
} 