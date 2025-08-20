import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from '@/hooks/use-toast'

interface UseFileUploadOptions {
  bucket: string
  allowedTypes?: string[]
  maxSize?: number // in bytes
}

export const useFileUpload = (options: UseFileUploadOptions) => {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const uploadFile = async (file: File, path?: string): Promise<string | null> => {
    // Validate file type
    if (options.allowedTypes && !options.allowedTypes.some(type => file.type.includes(type))) {
      toast({
        title: "Type de fichier non autorisé",
        description: `Types autorisés: ${options.allowedTypes.join(', ')}`,
        variant: "destructive"
      })
      return null
    }

    // Validate file size
    if (options.maxSize && file.size > options.maxSize) {
      const maxSizeMB = (options.maxSize / (1024 * 1024)).toFixed(1)
      toast({
        title: "Fichier trop volumineux",
        description: `Taille maximale: ${maxSizeMB}MB`,
        variant: "destructive"
      })
      return null
    }

    setUploading(true)
    setProgress(0)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = path || `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

      // Upload file
      const { data, error } = await supabase.storage
        .from(options.bucket)
        .upload(fileName, file)

      if (error) throw error

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(options.bucket)
        .getPublicUrl(fileName)

      toast({
        title: "Fichier uploadé",
        description: "Votre fichier a été uploadé avec succès"
      })

      return publicUrl
    } catch (error: any) {
      console.error('Upload error:', error)
      toast({
        title: "Erreur d'upload",
        description: error.message,
        variant: "destructive"
      })
      return null
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const uploadMultipleFiles = async (files: File[], pathPrefix?: string): Promise<string[]> => {
    const uploadPromises = files.map((file, index) => {
      const path = pathPrefix ? `${pathPrefix}/${index}-${file.name}` : undefined
      return uploadFile(file, path)
    })

    const results = await Promise.all(uploadPromises)
    return results.filter((url): url is string => url !== null)
  }

  const deleteFile = async (fileName: string) => {
    try {
      const { error } = await supabase.storage
        .from(options.bucket)
        .remove([fileName])

      if (error) throw error

      toast({
        title: "Fichier supprimé",
        description: "Le fichier a été supprimé avec succès"
      })
    } catch (error: any) {
      console.error('Delete error:', error)
      toast({
        title: "Erreur de suppression",
        description: error.message,
        variant: "destructive"
      })
    }
  }

  return {
    uploadFile,
    uploadMultipleFiles,
    deleteFile,
    uploading,
    progress
  }
}