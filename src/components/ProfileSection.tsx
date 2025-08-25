import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useFileUpload } from '@/hooks/useFileUpload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { User, Mail, Shield, LogOut, Upload, Save } from 'lucide-react'

export const ProfileSection = () => {
  const { user, profile, updateProfile, signOut } = useAuth()
  const { uploadFile, uploading } = useFileUpload({
    bucket: 'avatars',
    allowedTypes: ['image'],
    maxSize: 5 * 1024 * 1024 // 5MB
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    role: profile?.role || 'student'
  })

  const handleSave = async () => {
    await updateProfile(formData)
    setIsEditing(false)
  }

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    const avatarPath = `${user.id}/avatar.${file.name.split('.').pop()}`
    const avatarUrl = await uploadFile(file, avatarPath)
    
    if (avatarUrl) {
      await updateProfile({ avatar_url: avatarUrl })
    }
  }

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      student: { label: 'Élève', variant: 'default' as const },
      parent: { label: 'Parent', variant: 'secondary' as const },
      teacher: { label: 'Enseignant', variant: 'outline' as const },
      admin: { label: 'Administrateur', variant: 'destructive' as const }
    }
    
    return roleConfig[role as keyof typeof roleConfig] || { label: role, variant: 'default' as const }
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Chargement du profil...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Profil</h2>
        <p className="text-muted-foreground">
          Gérez vos informations personnelles et paramètres de compte
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Informations personnelles
              </CardTitle>
              <CardDescription>
                Vos informations de base et rôle dans l'application
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback className="text-lg">
                    {profile.full_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <Label htmlFor="avatar-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" disabled={uploading} asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        {uploading ? 'Upload...' : 'Changer la photo'}
                      </span>
                    </Button>
                  </Label>
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG jusqu'à 5MB
                  </p>
                </div>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Nom complet</Label>
                  {isEditing ? (
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-md">
                      {profile.full_name}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="p-3 bg-muted rounded-md flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {profile.email}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Rôle</Label>
                  {isEditing ? (
                    <Select
                      value={formData.role}
                      onValueChange={(value: any) => setFormData({...formData, role: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Élève</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="teacher">Enseignant</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="p-3 bg-muted rounded-md">
                      <Badge variant={getRoleBadge(profile.role).variant}>
                        <Shield className="w-3 h-3 mr-1" />
                        {getRoleBadge(profile.role).label}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Membre depuis</Label>
                  <div className="p-3 bg-muted rounded-md">
                    {new Date(profile.created_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                {isEditing ? (
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Sauvegarder
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Annuler
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    Modifier le profil
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions du compte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={signOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Se déconnecter
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Messages envoyés</span>
                <span className="font-medium">--</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Dernière connexion</span>
                <span className="font-medium">Maintenant</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}