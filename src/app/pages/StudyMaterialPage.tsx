import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { FileText, Download, Upload, Trash2, BookOpen, Calendar } from 'lucide-react';
import { toast } from 'sonner';

export const StudyMaterialPage: React.FC = () => {
  const { currentUser, materials, addMaterial, deleteMaterial } = useAuth();
  const isProfessor = currentUser?.role === 'professor';
  const isStudent = currentUser?.role === 'student';

  // Upload form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileType, setFileType] = useState<'pdf' | 'ppt' | 'doc' | 'note'>('pdf');
  const [fileName, setFileName] = useState('');

  // Filter state
  const [filterSubject, setFilterSubject] = useState<string>('all');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !isProfessor) return;

    const newMaterial = {
      title,
      subject: currentUser.subject!,
      professorId: currentUser.id,
      professorName: currentUser.name,
      fileType,
      uploadDate: new Date().toISOString().split('T')[0],
      description,
      fileName,
    };

    addMaterial(newMaterial);
    toast.success('Material uploaded successfully! 🎉');
    
    // Reset form
    setTitle('');
    setDescription('');
    setFileName('');
  };

  const handleDelete = (materialId: string) => {
    deleteMaterial(materialId);
    toast.success('Material deleted! 🗑️');
  };

  const handleDownload = (material: any) => {
    toast.success(`Downloading ${material.fileName}... 📥`);
  };

  // Get all unique subjects
  const subjects = ['all', ...new Set(materials.map(m => m.subject))];

  // Filter materials
  const filteredMaterials = filterSubject === 'all' 
    ? materials 
    : materials.filter(m => m.subject === filterSubject);

  // For professors, show only their materials
  const displayMaterials = isProfessor 
    ? filteredMaterials.filter(m => m.professorId === currentUser.id)
    : filteredMaterials;

  const fileTypeIcons = {
    pdf: '📄',
    ppt: '📊',
    doc: '📝',
    note: '📋',
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Study Materials
        </h1>
        <p className="text-gray-600">
          {isProfessor ? 'Upload and manage your course materials 📚' : 'Access and download learning resources 📖'}
        </p>
      </div>

      {/* Upload Form - Professors Only */}
      {isProfessor && (
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload New Material
            </CardTitle>
            <CardDescription>Share notes, PDFs, PPTs, or instructions with students</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Chapter 5: Algorithms"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="fileName">File Name *</Label>
                  <Input
                    id="fileName"
                    placeholder="e.g., algorithms_chapter5.pdf"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="fileType">File Type *</Label>
                <Select value={fileType} onValueChange={(v: any) => setFileType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="ppt">PowerPoint Presentation</SelectItem>
                    <SelectItem value="doc">Word Document</SelectItem>
                    <SelectItem value="note">Class Notes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the material..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="bg-purple-100 p-3 rounded-lg text-sm">
                <p><strong>Subject:</strong> {currentUser.subject}</p>
                <p><strong>Professor:</strong> {currentUser.name}</p>
              </div>
              <Button type="submit" className="w-full">
                Upload Material 🚀
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Label>Filter by Subject:</Label>
            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {subject === 'all' ? '📚 All Subjects' : `📖 ${subject}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Materials List */}
      <div className="space-y-4">
        {displayMaterials.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">No materials available yet</p>
              {isProfessor && (
                <p className="text-gray-400 text-sm mt-2">Upload your first material above! ✨</p>
              )}
            </CardContent>
          </Card>
        ) : (
          displayMaterials.map((material) => (
            <Card key={material.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-3xl">
                      {fileTypeIcons[material.fileType]}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{material.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {material.subject}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {material.uploadDate}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{material.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          {material.professorName}
                        </span>
                        <span className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                          {material.fileType.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {isStudent && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(material)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                    {isProfessor && material.professorId === currentUser.id && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(material.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
