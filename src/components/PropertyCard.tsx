import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Property } from '@/data/mockProperties';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square,
  Calendar,
  ArrowRight
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
}

const PropertyCard = ({ property, onViewDetails }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getPropertyTypeColor = (type: string) => {
    switch (type) {
      case 'apartment':
        return 'bg-info text-info-foreground';
      case 'house':
        return 'bg-success text-success-foreground';
      case 'commercial':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Card className="shadow-card hover:shadow-elegant transition-all duration-300 group">
      <CardHeader className="p-0">
        <div className="relative">
          <img 
            src={property.imageUrl} 
            alt={property.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className={getPropertyTypeColor(property.propertyType)}>
              {property.propertyType}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-background/90 text-foreground">
              {formatPrice(property.price)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {property.district}, {property.city}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              {property.area}m²
            </div>
            {property.bedrooms && (
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                {property.bedrooms}
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                {property.bathrooms}
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {property.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 mr-1" />
              Listed {formatDate(property.listedDate)}
            </div>
            
            <Button 
              variant="analytics" 
              size="sm"
              onClick={() => onViewDetails(property)}
              className="group-hover:shadow-glow"
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;