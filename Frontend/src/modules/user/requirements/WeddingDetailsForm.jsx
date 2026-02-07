import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import Icon from '../../../components/ui/Icon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WeddingDetailsForm = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [formData, setFormData] = useState({
    brideName: '',
    groomName: '',
    weddingDate: '',
    venue: '',
    budget: '',
    guestCount: '',
    weddingTheme: '',
    specialRequirements: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.brideName.trim()) {
      newErrors.brideName = "Bride's name is required";
    }
    if (!formData.groomName.trim()) {
      newErrors.groomName = "Groom's name is required";
    }
    if (!formData.weddingDate) {
      newErrors.weddingDate = "Wedding date is required";
    }
    if (!formData.venue.trim()) {
      newErrors.venue = "Venue is required";
    }
    if (!formData.budget) {
      newErrors.budget = "Budget is required";
    }
    if (!formData.guestCount) {
      newErrors.guestCount = "Guest count is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      localStorage.setItem('weddingDetails', JSON.stringify(formData));
      navigate('/user/dashboard');
    }
  };

  const handleSkip = () => {
    navigate('/user/dashboard');
  };

  return (
    <div 
      className="min-h-screen px-4 py-8 pb-24"
      style={{ backgroundColor: theme.semantic.background.secondary }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div 
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: theme.colors.primary[100] }}
          >
            <Icon name="rings" size="2xl" style={{ color: theme.colors.primary[500] }} />
          </div>
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: theme.semantic.text.primary }}
          >
            📝 Your Wedding Details
          </h1>
          <p 
            className="text-sm"
            style={{ color: theme.semantic.text.secondary }}
          >
            Fill in your details below to get personalized recommendations
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bride and Groom Names */}
          <div 
            className="p-6 rounded-2xl"
            style={{ backgroundColor: theme.semantic.background.primary }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: theme.colors.primary[600] }}
                >
                  Bride's Name: *
                </label>
                <Input
                  type="text"
                  name="brideName"
                  value={formData.brideName}
                  onChange={handleChange}
                  placeholder="Enter bride's name"
                  className={errors.brideName ? 'border-red-500' : ''}
                />
                {errors.brideName && (
                  <p className="text-xs text-red-500 mt-1">{errors.brideName}</p>
                )}
              </div>

              <div>
                <label 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: theme.colors.primary[600] }}
                >
                  Groom's Name: *
                </label>
                <Input
                  type="text"
                  name="groomName"
                  value={formData.groomName}
                  onChange={handleChange}
                  placeholder="Enter groom's name"
                  className={errors.groomName ? 'border-red-500' : ''}
                />
                {errors.groomName && (
                  <p className="text-xs text-red-500 mt-1">{errors.groomName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Wedding Date and Venue */}
          <div 
            className="p-6 rounded-2xl"
            style={{ backgroundColor: theme.semantic.background.primary }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: theme.colors.primary[600] }}
                >
                  Wedding Date: *
                </label>
                <Input
                  type="date"
                  name="weddingDate"
                  value={formData.weddingDate}
                  onChange={handleChange}
                  className={errors.weddingDate ? 'border-red-500' : ''}
                />
                {errors.weddingDate && (
                  <p className="text-xs text-red-500 mt-1">{errors.weddingDate}</p>
                )}
              </div>

              <div>
                <label 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: theme.colors.primary[600] }}
                >
                  Venue: *
                </label>
                <Input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="Enter venue name or city"
                  className={errors.venue ? 'border-red-500' : ''}
                />
                {errors.venue && (
                  <p className="text-xs text-red-500 mt-1">{errors.venue}</p>
                )}
              </div>
            </div>
          </div>

          {/* Budget and Guest Count */}
          <div 
            className="p-6 rounded-2xl"
            style={{ backgroundColor: theme.semantic.background.primary }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: theme.colors.primary[600] }}
                >
                  Total Budget: *
                </label>
                <div className="relative">
                  <span 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
                    style={{ color: theme.semantic.text.secondary }}
                  >
                    ₹
                  </span>
                  <Input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Enter your budget"
                    className={`pl-8 ${errors.budget ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.budget && (
                  <p className="text-xs text-red-500 mt-1">{errors.budget}</p>
                )}
              </div>

              <div>
                <label 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: theme.colors.primary[600] }}
                >
                  Guest Count: *
                </label>
                <Input
                  type="number"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  placeholder="Expected number of guests"
                  className={errors.guestCount ? 'border-red-500' : ''}
                />
                {errors.guestCount && (
                  <p className="text-xs text-red-500 mt-1">{errors.guestCount}</p>
                )}
              </div>
            </div>
          </div>

          {/* Wedding Theme */}
          <div 
            className="p-6 rounded-2xl"
            style={{ backgroundColor: theme.semantic.background.primary }}
          >
            <label 
              className="block text-sm font-semibold mb-2"
              style={{ color: theme.colors.primary[600] }}
            >
              Wedding Theme/Style:
            </label>
            <Input
              type="text"
              name="weddingTheme"
              value={formData.weddingTheme}
              onChange={handleChange}
              placeholder="Traditional, Modern Fusion, Royal, etc."
            />
          </div>

          {/* Special Requirements */}
          <div 
            className="p-6 rounded-2xl"
            style={{ backgroundColor: theme.semantic.background.primary }}
          >
            <label 
              className="block text-sm font-semibold mb-2"
              style={{ color: theme.colors.primary[600] }}
            >
              Notes/Special Requirements:
            </label>
            <textarea
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleChange}
              placeholder="Any specific requirements or preferences..."
              rows="4"
              className="w-full px-4 py-3 rounded-xl border text-sm resize-none"
              style={{
                backgroundColor: theme.semantic.input.background,
                borderColor: theme.semantic.border.primary,
                color: theme.semantic.text.primary
              }}
            />
          </div>

          {/* Info Tip */}
          <div 
            className="p-4 rounded-xl flex items-start gap-3"
            style={{ backgroundColor: theme.colors.secondary[50] }}
          >
            <Icon name="lightbulb" size="md" style={{ color: theme.colors.secondary[500] }} />
            <p 
              className="text-xs"
              style={{ color: theme.semantic.text.secondary }}
            >
              💡 Tip: Providing accurate details helps us recommend the best vendors and services for your wedding!
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full py-4 text-base font-bold"
              style={{
                backgroundColor: theme.colors.primary[500],
                color: 'white'
              }}
            >
              Continue to Dashboard →
            </Button>

            <button
              type="button"
              onClick={handleSkip}
              className="w-full py-3 text-sm font-medium rounded-xl transition-colors"
              style={{
                color: theme.semantic.text.secondary,
                backgroundColor: 'transparent'
              }}
            >
              Skip for now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WeddingDetailsForm;
